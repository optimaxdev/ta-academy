import { DoneRequest } from '@Core/doneRequest';
import { MockObject } from '@Mocks/mockObject';
import { waitFor } from '@Utils/waitFor';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { getLogger } from 'log4js';
import type { MockedRequest, MockedResponse } from 'msw';
import { rest } from 'msw';
import type { ResponseComposition } from 'msw/lib/types/response';
import type { restContext } from 'msw/lib/types/rest';
import { setupServer } from 'msw/native';

export class Mock {
    private static instance: Mock;
    public doneRequests: Record<string, Record<string, DoneRequest[]>>;
    private blockedInterceptors: Map<number, string> = new Map<number, string>();

    private mockLogger = getLogger('Mock');

    private mocks: Record<string, MockObject> = {};

    private server = setupServer(
        rest.get(/.*/, this.resolver.bind(this)),
        rest.post(/.*/, this.resolver.bind(this)),
        rest.put(/.*/, this.resolver.bind(this)),
        rest.delete(/.*/, this.resolver.bind(this)),
        rest.patch(/.*/, this.resolver.bind(this)),
        rest.options(/.*/, this.resolver.bind(this))
    );

    private constructor() {
        this.server.listen({
            onUnhandledRequest: 'warn',
        });
        this.doneRequests = {};
    }

    public static getInstance(): Mock {
        if (!Mock.instance) Mock.instance = new Mock();
        return Mock.instance;
    }

    public addDefaultMocks(): void {
        this.addMocks();
    }

    public addMocks(...mocks: MockObject[]): void {
        mocks.forEach(mock => this.addMock(mock));
    }

    public clearDoneRequests(): void {
        this.doneRequests = {};
    }

    public close(): void {
        this.server.close();
        Mock.instance = null;
        this.mocks = {};
        this.stopAllRequestBlocking();
    }

    public findLastDoneRequest(mock: MockObject): DoneRequest {
        const doneRequests = this.getDoneRequests(mock);
        return doneRequests.slice(-1)[0];
    }

    public getDoneRequests(mock: MockObject | { method: string; url: string }): DoneRequest[] {
        const { url, method } =
            (mock as MockObject).getPath && (mock as MockObject).getPath()
                ? (mock as MockObject).getPath()
                : (mock as { method: string; url: string });
        if (!this.doneRequests[url]) return [];
        if (!this.doneRequests[url][method.toUpperCase()]) return [];
        return this.doneRequests[url][method.toUpperCase()];
    }

    public getMock(mock: MockObject): MockObject | undefined {
        return this.mocks[mock.getPath().url];
    }

    public startRequestBlocking(block: MockObject | string, data: unknown = {}): void {
        const blockedUrl = block instanceof MockObject ? block.getPath().url : block;
        const interceptorId = axios.interceptors.response.use((res: AxiosResponse) =>
            blockedUrl.includes(res.config.url) || res.config.url.includes(blockedUrl) ? Promise.reject(data) : res
        );
        this.blockedInterceptors.set(interceptorId, blockedUrl);
    }

    public stopAllRequestBlocking(): void {
        this.blockedInterceptors.forEach(b => this.stopRequestBlocking(b));
    }

    public stopRequestBlocking(unblock: MockObject | string): void {
        const blockedUrl = unblock instanceof MockObject ? unblock.getPath().url : unblock;
        const inetrceptors = [...this.blockedInterceptors.entries()];
        const [interceptorId] = inetrceptors.find(([, url]) => url === blockedUrl);
        axios.interceptors.response.eject(interceptorId);
    }

    public async waitForDoneRequests(mock: MockObject | { method: string; url: string }): Promise<DoneRequest[]> {
        try {
            return await waitFor(() => this.getDoneRequests(mock).reverse());
        } catch (e) {
            throw new Error(`Cannot get done request \n${(e as Error).stack}`);
        }
    }

    private addDoneRequest(url: string, req: MockedRequest): void {
        const { method } = req;
        if (!this.doneRequests[url]) this.doneRequests[url] = {};
        if (!this.doneRequests[url][method]) this.doneRequests[url][method] = [];
        this.doneRequests[url][method].push(new DoneRequest(req));
    }

    private addMock(mock: MockObject): void {
        const { url, method } = mock.getPath();
        this.mocks[url] = mock;
        this.server.use(
            rest[method](url, async (req, res, context) => {
                this.addDoneRequest(url, req);
                const href = req.url.href.replace('http://localhost', '');
                this.mockLogger.debug(`\u001b[1;32m[${req.method.toLowerCase()}] ${href} is mocked.\u001b[m`);
                const fixture = await mock.getFixture(req);
                return res(context.json(fixture));
            })
        );
    }

    private resolver(req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse {
        const href = req.url.href.replace('http://localhost', '');
        this.addDoneRequest(href, req);
        this.mockLogger.debug(`\u001b[1;31m[${req.method.toLowerCase()}] ${href} isn't mocked.\u001b[m`);
        return res(context.status(404));
    }
}

import { parseFormData } from '@Utils/parseFormData';
import type { MockedRequest, RequestParams } from 'msw';

export class DoneRequest {
    private readonly req: MockedRequest;

    public constructor(req: MockedRequest) {
        this.req = req;
    }

    public getBody(): string | Record<string, unknown> {
        const { body } = this.req;
        if ((body as { _streams: string[] })._streams) {
            return parseFormData(this.req.body as { _streams: string[] });
        }
        return body;
    }

    public getParams(): RequestParams {
        return this.req.params;
    }

    public getUrl(): URL {
        return this.req.url;
    }
}

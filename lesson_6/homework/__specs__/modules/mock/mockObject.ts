import type { MockedRequest } from 'msw/lib/types/handlers/requestHandler';

type Method = 'get' | 'post' | 'put' | 'delete';
type MockOptions = { method: Method; url: string };

export abstract class MockObject {
    protected path: MockOptions;

    public getPath(): MockOptions {
        return this.path;
    }

    public abstract getFixture(
        req: MockedRequest
    ):
        | Promise<Record<string, unknown> | Record<string, unknown>[]>
        | Record<string, unknown>
        | Record<string, unknown>[];
}

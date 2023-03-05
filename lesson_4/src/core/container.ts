import type { Page } from 'playwright-core';

export class Container {
    constructor(protected page: Page) {}
}

import type { Locator } from '@playwright/test';
import type { Page } from 'playwright-core';

export class Component {
    constructor(protected locator: Locator, protected page: Page) {}
}

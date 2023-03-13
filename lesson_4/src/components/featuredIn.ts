/* eslint-disable prettier/prettier */
import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class FeaturedIn extends Component {
    protected LOCATORS = {
        magazines: this.locator.locator('//img'),
        featuredBlock: this.locator,
    };

    public async getMagazines(): Promise<Locator[]> {
        return this.LOCATORS.magazines.all();
    }

    public async scrollTo(): Promise<void> {
        await this.LOCATORS.featuredBlock.scrollIntoViewIfNeeded();
    }
}

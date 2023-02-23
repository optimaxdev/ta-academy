import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        products: this.page.locator('[data-test-name="product"]'),
    };

    public async open(url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    public async firstProductClick() {
        let arrayProducts = await this.LOCATORS.products.all();
        await Promise.all([
            await arrayProducts[0].click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}

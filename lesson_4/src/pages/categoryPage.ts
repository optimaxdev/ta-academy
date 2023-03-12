import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
    };
    public async open(url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }
    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }
    public async chooseProduct(): Promise<void> {
        const allProducts = await this.LOCATORS.product.all();
        await allProducts[0].click();

        await this.page.waitForLoadState('domcontentloaded');
    }
}

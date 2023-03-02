import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
        firstProduct: this.page.locator('[data-test-id="10755"]'),
    };
    public async open(url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }
    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }

    public async getFirstProduct(): Promise<void> {
        await this.LOCATORS.firstProduct.click(), this.page.waitForLoadState('domcontentloaded');
    }

}

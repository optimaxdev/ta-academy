import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
        productFirst: this.page.locator('//ul[contains(@class, "categoryRows__list")//a').nth(0),
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
        await this.LOCATORS.productFirst.click(), this.page.waitForLoadState('domcontentloaded');
    }
}

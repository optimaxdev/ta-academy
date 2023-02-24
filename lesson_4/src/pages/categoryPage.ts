import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class CategoryPage extends Container {
    protected LOCATORS = {
        products: this.page.locator('[data-test-name="product"]'),
        product: this.page.locator('//*[@id="category-items-grid"]/li[1]/div[1]'),
    };

    public async open(url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    };

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.products.all();
    };

    public async getFirstProducts(): Promise<void> {
        this.LOCATORS.product.click()
    };
}

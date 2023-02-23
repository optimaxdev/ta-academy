import { Container } from '@Core/container';

export class CategoryPage extends Container {
    protected LOCATORS = {
        products: this.page.locator('[data-test-name="product"]'),
    };

    public async open(
        url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses'
    ): Promise<void> {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    public async firstProductClick(): Promise<void> {
        let arrayProducts = await this.LOCATORS.products.all();

        await arrayProducts[0].click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

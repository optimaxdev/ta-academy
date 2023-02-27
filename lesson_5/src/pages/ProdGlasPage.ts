import { Container } from '@Core/container';
import { GlassesCard } from '@Components/GlasCard';

export class productGlassesPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
    };

    public glassesCard = new GlassesCard(this.LOCATORS.product, this.page);

    public async open(url: 'eyeglasses-collection' | 'sunglasses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }
}
import { SunglassesCard } from '@Components/sunglassesCard';
import { Container } from '@Core/container';

export class SunglassesCatalogPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('(//a[@class="glassesItem__wrapImage___10y44"])[1]'),
    };

    public SunglassesCard = new SunglassesCard(this.LOCATORS.product, this.page);

    public async open() {
        await this.page.goto('/sunglasses', { waitUntil: 'domcontentloaded' });
    }
}

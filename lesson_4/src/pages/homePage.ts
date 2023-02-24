import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';

export class HomePage extends Container {
    static open() {
      throw new Error('Method not implemented.');
    }
    protected LOCATORS = {
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
    };

    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

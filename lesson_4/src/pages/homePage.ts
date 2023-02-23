import { Container } from '@Core/container';
import { Header } from '@Components/header';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';

export class HomePage extends Container {
    protected LOCATORS = {
        header: this.page.locator('//header'),
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
    };

    public Header = new Header(this.LOCATORS.featured, this.page);
    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

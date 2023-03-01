import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';
import { Header } from '@Components/header';

export class HomePage extends Container {
    protected LOCATORS = {
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
        header: this.page.locator('//header'),
    };

    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

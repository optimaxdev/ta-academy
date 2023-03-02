import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';
import { SunglassesButton} from '@Components/sunglassesButton';

export class HomePage extends Container {
    protected LOCATORS = {
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
        sunglassesButton: this.page.locator('//nav'),
    };

    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);
    public sunglassesButton = new SunglassesButton(this.LOCATORS.sunglassesButton, this.page);

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';
import { SunglasesNavbarButton } from '@Components/SunglasesNavbarButton';

export class HomePage extends Container {
    protected LOCATORS = {
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
        sunglasesNavbarButton: this.page.locator('//nav//a[contains(., "Sunglasses")]'),
    };

    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);
    public sunglasesNavbarButton = new SunglasesNavbarButton(
        this.LOCATORS.sunglasesNavbarButton,
        this.page
    );

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

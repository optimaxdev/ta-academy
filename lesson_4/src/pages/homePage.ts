import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';
<<<<<<< HEAD
import { Header } from '@Components/header';
import { RegisterPopupForm } from '@Components/registerPopupForm';
=======
import { Sunglasses } from '@Components/sunglasses';

export class HomePage extends Container {
    protected LOCATORS = {
        footer: this.page.locator('//footer'),
        featured: this.page.locator('//section[contains(., "As featured in.")]'),
        header: this.page.locator('header'),
        registerForm: this.page.locator('[id="form-popup-register"]'),
        sunglasses: this.page.locator('//nav//a[contains(., "Sunglasses")]'),
    };

    public FeatureIn = new FeaturedIn(this.LOCATORS.featured, this.page);
    public Footer = new Footer(this.LOCATORS.footer, this.page);
    public Header = new Header(this.LOCATORS.header, this.page);
    public RegisterForm = new RegisterPopupForm(this.LOCATORS.registerForm, this.page);
    public Sunglasses = new Sunglasses(this.LOCATORS.sunglasses, this.page);

    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

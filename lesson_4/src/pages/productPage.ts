import { Container } from '@Core/container';
import { Footer } from '@Components/footer';
import { FeaturedIn } from '@Components/featuredIn';
import { Header } from '@Components/header';
import { RegisterPopupForm } from '@Components/registerPopupForm';
import { Sidebar } from '@Components/sidebar';
import { Wizzard } from '@Components/wizzard';

export class ProductPage extends Container {
    protected LOCATORS = {
        sidebar: this.page.locator('[id="sidebar"]'),
        registerForm: this.page.locator('[id="form-popup-register"]'),
        wizzardBox: this.page.locator('//div[contains(@class, "steps__wrapperForScroll")]')
    };

    public RegisterForm = new RegisterPopupForm(this.LOCATORS.registerForm, this.page);
    public SidebarBox = new Sidebar(this.LOCATORS.sidebar, this.page);
    public WizzardBox = new Wizzard(this.LOCATORS.wizzardBox, this.page);


    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }



}

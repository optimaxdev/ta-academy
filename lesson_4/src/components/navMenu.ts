import { Component } from '@Core/component';

export class NavMenu extends Component {
    protected LOCATORS = {
        // contactLink: this.locator.locator('//nav//ul//li//a[contains(., "Contacts")]'),
        contactsLink: this.locator.locator('//a[contains(., "Contacts")]'),
        sunglassesLink: this.locator.locator('//a[contains(., "Sunglasses")]')
    };

    public async clickContacts(): Promise<void> {
        await this.LOCATORS.contactsLink.click();

    }
    public async clickSunglasses(): Promise<void> {
        await this.LOCATORS.sunglassesLink.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

}

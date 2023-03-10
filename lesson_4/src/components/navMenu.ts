import { Component } from '@Core/component';

export class NavMenu extends Component {
    protected LOCATORS = {
        // contactLink: this.locator.locator('//nav//ul//li//a[contains(., "Contacts")]'),
        contactsLink: this.locator.locator('//a[contains(., "Contacts")]')
    };

    public async clickContacts(): Promise<void> {
        await this.LOCATORS.contactsLink.click();
    }

}

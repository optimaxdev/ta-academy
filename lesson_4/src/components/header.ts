import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        accountTooltip: this.locator.locator('//button[contains(., "My Account")]'),
        createAccount: this.locator.locator('a', { hasText: 'Create Account' }),
        myAccount: this.locator.locator('a', { hasText: 'My Account' }),
        welcome: this.locator.locator('//button[contains(., "Welcome,")]'),
    };

    public async clickAccountTooltip(): Promise<void> {
        await this.LOCATORS.accountTooltip.click();
    }

    public async clickCreateAccount(): Promise<void> {
        await this.LOCATORS.createAccount.click();
    }

    public async clickMyAccount(): Promise<void> {
        await this.LOCATORS.myAccount.click();
    }

    public async clickWelcome(): Promise<void> {
        await this.LOCATORS.welcome.click();
    }

    public async getUserName(): Promise<string | undefined> {
        return (await this.LOCATORS.welcome.textContent())?.replace('Welcome, ', '');
    }
}

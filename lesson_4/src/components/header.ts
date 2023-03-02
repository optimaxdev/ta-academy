import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        accountTooltip: this.locator.locator('//button[contains(., "My Account")]'),
        createAccount: this.locator.locator('a', { hasText: 'Create Account' }),
        welcome: this.locator.locator('//button[contains(., "Welcome,")]'),
        sunglassesButton: this.locator.locator('//nav//a[contains(., "Sunglasses")]')
    };

    public async clickAccountTooltip(): Promise<void> {
        await this.LOCATORS.accountTooltip.click();
    }

    public async clickCreateAccount(): Promise<void> {
        await this.LOCATORS.createAccount.click();
    }

    public async getUserName(): Promise<string | undefined> {
        return (await this.LOCATORS.welcome.textContent())?.replace('Welcome, ', '');
    }

    public async clickSunglassesButton(): Promise<void> {
        await Promise.all([this.LOCATORS.sunglassesButton.click(), this.page.waitForLoadState('domcontentloaded')]);
    }
}

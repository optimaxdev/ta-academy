import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';
import { Profile } from '@Components/profile';
import { AccountDetails } from '@Components/accountDetails';

export class ProfilePage extends Container {
    protected LOCATORS = {
        profile: this.page.locator('[data-testid="profile"]'),
        accountDetails: this.page.locator('[name="myDetails"]'),
    };

    public Profile = new Profile(this.LOCATORS.profile, this.page);
    public AccountDetails = new AccountDetails(this.LOCATORS.accountDetails, this.page);

    public async open() {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }
}

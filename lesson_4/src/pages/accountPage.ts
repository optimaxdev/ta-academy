import { Container } from '@Core/container';
import { ProfileDetails } from '@Components/profileDetails';
import { AccountDetails } from '@Components/accountDetails';

export class AccountPage extends Container {
    protected LOCATORS = {
        profile: this.page.locator('[data-testid="profile"]'),
        accountDetails: this.page.locator('[data-testid="section-myDetails"]'),
    };

    public ProfileDetails = new ProfileDetails(this.LOCATORS.profile, this.page);
    public AccountDetails = new AccountDetails(this.LOCATORS.accountDetails, this.page);

    public async open() {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }
}

import { Container } from '@Core/container';
import { AccountComponent } from '@Components/accountComponent';

export class AccountPage extends Container {
    protected LOCATORS = {
        accountComponent: this.page.locator(
            "//div[contains(@class, 'myAccountContent__container')]"
        ),
    };

    public AccountComponent = new AccountComponent(this.LOCATORS.accountComponent, this.page);
}

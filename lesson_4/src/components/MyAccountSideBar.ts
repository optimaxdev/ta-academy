import { Component } from '@Core/component';

type menyButton =
    | 'myOrders'
    | 'myPrescriptions'
    | 'myDetails'
    | 'myAddresses'
    | 'myTryOnImages'
    | 'myCards';

export class MyAccountSideBar extends Component {
    protected LOCATORS = {
        menuButton: (name: menyButton) => this.locator.locator(`//a[contains(@data-id,"${name}")]`),
        profileTitle: this.locator.locator('//div[contains(text(), "Hi")]'),
        sideBar: this.locator,
    };

    public async menuButtonClick(nameMenu: menyButton): Promise<void> {
        await this.LOCATORS.menuButton(nameMenu).click();
    }

    public async getUserName(): Promise<string | undefined> {
        return (await this.LOCATORS.profileTitle.innerText()).split(' ').pop();
    }
}

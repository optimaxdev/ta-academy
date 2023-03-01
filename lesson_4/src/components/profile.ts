import { Component } from '@Core/component';

export class Profile extends Component {
    protected LOCATORS = {
        firstName: this.locator.locator('//div[contains(text(), "Hi")]'),
    };

    public async getUserName(): Promise<string | undefined> {
        return (await this.LOCATORS.firstName.textContent())?.replace('Hi ', '');
    }
}

import { Component } from '@Core/component';

export class ProfileDetails extends Component {
    protected LOCATORS = {
        profileName: this.locator.locator('//div[contains(text(), "Hi")]'),
    };

    public async getProfileName(): Promise<string | undefined> {
        return (await this.LOCATORS.profileName.textContent())?.replace('Hi ', '');
    }
}

import { Component } from '@Core/component';
export class Profile extends Component {
    protected LOCATORS = {
        profileTitle: this.page.locator("//div[contains(@class, 'profile__title')]"),
    };

    public async getNameFromProfileTitle(): Promise<string | undefined> {
        return (await this.LOCATORS.profileTitle.textContent())?.replace('Hi ', '');
    }
}

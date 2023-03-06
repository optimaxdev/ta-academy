import { Component } from '@Core/component';

export class Profile extends Component {
  protected LOCATORS = {
    firstName: this.locator.locator('//img/../../div[2]'),
  };

  public async getProfileName(): Promise<string | undefined> {
    return (await this.LOCATORS.firstName.textContent())?.replace('Hi ', '');
  }
}
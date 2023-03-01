import { Component } from '@Core/component';

export class MyDetails extends Component {
  protected LOCATORS = {
    firstName: this.locator.locator('//div[text()="First Name:"]/../div[2]'),
    lastName: this.locator.locator('//div[text()="Last Name:"]/../div[2]'),
    email: this.locator.locator('//div[text()="Email Address:"]/../div[2]'),
    editInformation: this.locator.locator('//button[text()="Edit Information"]'),
    inputFirstName: this.page.locator('//input[@placeholder="First Name"]'),
    inputLastName: this.page.locator('//input[@placeholder="Last Name"]'),
    saveChangedInfo: this.page.locator('//span[text()="Save"]'),
    closeEdit: this.page.locator('//span[text()="Close"]'),
  };

  public async getFirstName(): Promise<string | null> {
    return await this.LOCATORS.firstName.textContent();
  }

  public async getLastName(): Promise<string | null> {
    return await this.LOCATORS.lastName.textContent();
  }

  public async getEmail(): Promise<string | null> {
    return await this.LOCATORS.email.textContent();
  }

  public async clickEditInformation(): Promise<void> {
    await this.LOCATORS.editInformation.click();
  }

  public async changeFirstName(newFirstName: string): Promise<void> {
    await this.LOCATORS.inputFirstName.fill(newFirstName);
  }

  public async changeLastName(newLastName: string): Promise<void> {
    await this.LOCATORS.inputLastName.fill(newLastName);
  }

  public async clickSaveChangedInfo(): Promise<void> {
    await this.LOCATORS.saveChangedInfo.click();
  }

  public async clickCloseEdit(): Promise<void> {
    await this.LOCATORS.closeEdit.click();
  }
}
import { Component } from '@Core/component';
export class AccountDetails extends Component {
    protected LOCATORS = {
        myDetailsFirstName: this.page.locator("//div[contains(text(), 'First Name:')]//../div[2]"),
        myDetailsLastName: this.page.locator("//div[contains(text(), 'Last Name:')]/../div[2]"),
        myDetailsEmail: this.page.locator("//div[contains(text(), 'Email Address:')]/../div[2]"),
        editInformationButton: this.page.locator("//button[text()='Edit Information']"),
        firstNameInput: this.page.locator("//input[@placeholder='First Name']"),
        lastNameInput: this.page.locator("//input[@placeholder='Last Name']"),
        emailAddressInput: this.page.locator("//input[@placeholder='Email Address']"),
        saveButton: this.page.locator("//span[text()='Save']"),
        closeButton: this.page.locator("//span[text()='Close']"),
    };
    public async getFirstNameFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.myDetailsFirstName.textContent())?.toString();
    }

    public async getLastNameFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.myDetailsLastName.textContent())?.toString();
    }

    public async getEmailFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.myDetailsEmail.textContent())?.toString();
    }

    public async editInformationClick(): Promise<void> {
        await this.LOCATORS.editInformationButton.click();
    }

    public async changeFirstName(data: string): Promise<void> {
        await this.LOCATORS.firstNameInput.fill(data);
    }

    public async changeLastName(data: string): Promise<void> {
        await this.LOCATORS.lastNameInput.fill(data);
    }

    public async saveClick(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async closeClick(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }
}

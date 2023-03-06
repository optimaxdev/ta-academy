import { Component } from '@Core/component';

export class AccountDetails extends Component {
    protected LOCATORS = {
        firstName: this.locator.locator('//div[text()="First Name:"]/../div[2]'),
        lastName: this.locator.locator('//div[text()="Last Name:"]/../div[2]'),
        email: this.locator.locator('//div[text()="Email Address:"]/../div[2]'),
        editInfoButton: this.locator.locator('//button[contains(., "Edit Information")]'),
        inputFirstName: this.page.locator('//input[@placeholder="First Name"]'),
        inputLastName: this.page.locator('//input[@placeholder="Last Name"]'),
        saveButton: this.page.locator('//button[contains(., "Save")]'),
        closeButton: this.page.locator('//button[contains(., "Close")]'),
    };

    public async getFirstName(): Promise<string | null> {
        return await this.LOCATORS.firstName.textContent();
    }

    public async getLasttName(): Promise<string | null> {
        return await this.LOCATORS.lastName.textContent();
    }

    public async getEmail(): Promise<string | null> {
        return await this.LOCATORS.email.textContent();
    }

    public async clickChangeInfo(): Promise<void> {
        await this.LOCATORS.editInfoButton.click();
    }

    public async changeFirstName(data: string): Promise<void> {
        return await this.LOCATORS.inputFirstName.fill(data);
    }

    public async changeLastName(data: string): Promise<void> {
        return await this.LOCATORS.inputLastName.fill(data);
    }

    public async clickSaveButton(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async clickCloseButton(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }
}

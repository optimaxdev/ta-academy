import { Component } from '@Core/component';

export class ChangAccountDetails extends Component {
    protected LOCATORS = {
        firstNameInput: this.page.locator('//input[@placeholder="First Name"]'),
        lastNameInput: this.page.locator('//input[@placeholder="Last Name"]'),
        saveButton: this.page.locator('//button[contains(., "Save")]'),
        closeButton: this.page.locator('//button[contains(., "Close")]'),
    };

    public async fill(): Promise<void> {
        await this.LOCATORS.firstNameInput.fill('Mikhail');
        await this.LOCATORS.lastNameInput.fill('Lebedev');
        await this.clickSave();
        await this.closeButton();
    }

    public async clickSave(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async closeButton(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }
}

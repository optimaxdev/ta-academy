import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class MyDetailsSection extends Component {
    protected LOCATORS = {
         firstName: this.locator.locator('//div[text()="First Name:"]/../div[2]'),
         lastName: this.locator.locator('//div[text()="Last Name:"]/../div[2]'),
         email: this.locator.locator('//div[text()="Email Address:"]/../div[2]'),
         editLink: this.locator.locator('//button[contains(text(), "Edit Information")]'),
         saveButton: this.locator.locator('//button[contains(text(), "Save")]'),
         fieldEditAccountData: (innerText: string) =>
            this.locator.locator(`//input[@placeholder="${innerText}"]`),
    };

     public async getFirstName(): Promise<string | null> {
        return this.LOCATORS.firstName.textContent();
    }

    public async getLastName(): Promise<string | null> {
        return this.LOCATORS.lastName.textContent();
    }

    public async getEmail(): Promise<string | null> {
        return this.LOCATORS.email.textContent();
    }

    public async editLinkClick(): Promise<void> {
        await this.LOCATORS.editLink.click();
        await this.page.waitForTimeout(1000);
    }

    public async saveButtonClick(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async fillFormMyDetails(dataToFill: Record<string, string>): Promise<void> {
        await this.LOCATORS.fieldEditAccountData('First Name').fill(dataToFill.firstName);
        await this.LOCATORS.fieldEditAccountData('Last Name').fill(dataToFill.lastName);
    }
}

import { Component } from '@Core/component';

export class AccountComponent extends Component {
    protected LOCATORS = {
        nameUnderPhoto: this.locator.locator("//div[contains(@class, 'profile__title')]"),
        nameFromMyDetails: this.locator.locator('//div[text()="First Name:"]/../div[2]'),
        surnameFromMyDetails: this.locator.locator('//div[text()="Last Name:"]/../div[2]'),
        emailFromMyDetails: this.locator.locator('//div[text()="Email Address:"]/../div[2]'),
        findEditButton: this.locator.locator("//button[text()='Edit Information']"),
        nameFromEditMode: this.page.locator("//input[@placeholder='First Name']"),
        surnameFromEditMode: this.page.locator("//input[@placeholder='Last Name']"),
        saveInfoButton: this.locator.locator("//span[text()='Save']"),
        closeButton: this.locator.locator("//span[text()='Close']"),
    };

    public async getNameUnderPhoto(): Promise<string | undefined> {
        return (await this.LOCATORS.nameUnderPhoto.textContent())?.replace('Hi ', '');
    }

    public async getNameFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.nameFromMyDetails.textContent())?.toString();
    }

    public async getSurnameFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.surnameFromMyDetails.textContent())?.toString();
    }

    public async getEmailFromMyDetails(): Promise<string | undefined> {
        return (await this.LOCATORS.emailFromMyDetails.textContent())?.toString();
    }

    public async clickEditInfo(): Promise<void> {
        await this.LOCATORS.findEditButton.click();
    }

    public async changeName(): Promise<void> {
        await this.LOCATORS.nameFromEditMode.fill('Julia');
    }

    public async changeLastname(): Promise<void> {
        await this.LOCATORS.surnameFromEditMode.fill('Shomina');
    }

    public async clickSaveInfo(): Promise<void> {
        await this.LOCATORS.saveInfoButton.click();
    }

    public async clickCloseButton(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }
}

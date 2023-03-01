import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';

export class ProfilePage extends Container {
    protected LOCATORS = {
        profileTitle: this.page.locator("//div[contains(@class, 'profile__title')]"),
        myDetailsFirstName: this.page.locator(
            "//div[contains(text(), 'First Name:')]//following-sibling::div"
        ),
        myDetailsLastName: this.page.locator(
            "//div[contains(text(), 'Last Name:')]//following-sibling::div"
        ),
        myDetailsEmail: this.page.locator(
            "//div[contains(text(), 'Email Address:')]//following-sibling::div"
        ),
        editInformationButton: this.page.locator("//button[text()='Edit Information']"),
        saveButton: this.page.locator("//span[text()='Save']"),
        closeButton: this.page.locator("//span[text()='Close']"),
        firstNameInput: this.page.locator("//input[@placeholder='First Name']"),
        lastNameInput: this.page.locator("//input[@placeholder='Last Name']"),
    };
    public async open() {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }

    public async getNameFromAccountTitle(): Promise<string | undefined> {
        return (await this.LOCATORS.profileTitle.textContent())?.replace('Hi ', '');
    }

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

    public async changeFirstName(): Promise<void> {
        await this.LOCATORS.firstNameInput.fill('Andrey');
    }

    public async changeLastName(): Promise<void> {
        await this.LOCATORS.lastNameInput.fill('Odegov');
    }

    public async saveClick(): Promise<void> {
        await this.LOCATORS.saveButton.click();
    }

    public async closeClick(): Promise<void> {
        await this.LOCATORS.closeButton.click();
    }
}

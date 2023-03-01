import { Component } from '@Core/component';

export class MyDetails extends Component {
    protected LOCATORS = {
        firstName: this.locator.locator(
            '//div[normalize-space()="First Name:"]/following-sibling::div'
        ),
        lastName: this.locator.locator(
            '//div[normalize-space()="Last Name:"]/following-sibling::div'
        ),
        email: this.locator.locator(
            '//div[normalize-space()="Email Address:"]/following-sibling::div'
        ),
        editInformationButton: this.locator.locator('//button[contains(., "Edit Information")]'),
    };

    public async getUserFirstName(): Promise<string | null> {
        return await this.LOCATORS.firstName.textContent();
    }

    public async getUserLastName(): Promise<string | null> {
        return await this.LOCATORS.lastName.textContent();
    }

    public async getUserEmail(): Promise<string | null> {
        return await this.LOCATORS.email.textContent();
    }

    public async editInformation(): Promise<void> {
        await this.LOCATORS.editInformationButton.click();
    }
}

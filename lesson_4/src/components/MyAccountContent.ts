import { Component } from '@Core/component';

type Field = {
    firstName: string;
    lastName: string;
    email: string;
};
type InnerText = 'First Name' | 'Last Name' | 'Email Address';

export class MyAccountContent extends Component {
    protected LOCATORS = {
        content: this.locator,
        detailField: (innerText: InnerText) =>
            this.locator.locator(
                `//div[./div[contains(text(),"${innerText}:")]]/div[contains(@class,"detailField__text")]`
            ),
        fieldEditAccountData: (innerText: InnerText) =>
            this.locator.locator(`//input[@placeholder="${innerText}"]`),
        buttonEditInformation: this.locator.locator('//button[text()="Edit Information"]'),
        buttonSaveChanges: this.locator.locator('//button[contains(., "Save")]'),
        buttonCloseChanges: this.locator.locator('//button[contains(., "Close")]'),
    };

    public async getRegistrationData(): Promise<Field> {
        const firstName = (await this.LOCATORS.detailField('First Name').innerText()).trim();
        const lastName = (await this.LOCATORS.detailField('Last Name').innerText()).trim();
        const email = (await this.LOCATORS.detailField('Email Address').innerText()).trim();

        return { firstName, lastName, email };
    }

    public async buttonEditInformationClick() {
        this.LOCATORS.buttonEditInformation.click();
    }

    public async fillFormMyDetails(dataToFill: Record<string, string>): Promise<void> {
        await this.LOCATORS.fieldEditAccountData('First Name').fill(dataToFill.firstName);
        await this.LOCATORS.fieldEditAccountData('Last Name').fill(dataToFill.lastName);
        await this.LOCATORS.fieldEditAccountData('Email Address').fill(dataToFill.email);
    }

    public async buttonSaveChangesClick(): Promise<void> {
        await this.LOCATORS.buttonSaveChanges.click();
    }

    public async buttonCloseChangesClick(): Promise<void> {
        await this.LOCATORS.buttonCloseChanges.click();
    }
}

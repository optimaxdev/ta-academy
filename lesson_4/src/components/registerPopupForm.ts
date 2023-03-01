import { Component } from '@Core/component';

export class RegisterPopupForm extends Component {
    protected LOCATORS = {
        input: (name: string) => this.locator.locator(`[name=${name}]`),
        signUpButton: this.locator.locator('//button[contains(., "Sign Up")]'),
    };

    public async fill(dataToFill: Record<string, string>): Promise<void> {
        for (const [inputName, data] of Object.entries(dataToFill)) {
            await this.LOCATORS.input(inputName).fill(data);
        }
        await this.clickSignUp();
    }

    public async clickSignUp(): Promise<void> {
        await this.LOCATORS.signUpButton.click();
    }
}

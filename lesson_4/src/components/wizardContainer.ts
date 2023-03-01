import { Component } from '@Core/component';

export class WizardContainer extends Component {
    protected LOCATORS = {
        nonPrescription: this.locator.locator('//h3[normalize-space()="Non-prescription"]'),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backToPrev: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicButton: this.locator.locator('input[value="Super Hydrophobic"]'),
        openPopUp: this.locator.locator('//div[@role="presentation"]//button[@type="button"]'),
    };

    public async selectOption(): Promise<void> {
        await this.LOCATORS.nonPrescription.click();
    }

    public async continueButton(): Promise<void> {
        await this.LOCATORS.continueButton.click();
    }

    public async backToPrev(): Promise<void> {
        await this.LOCATORS.backToPrev.click();
    }

    public async hydrophobicButton(): Promise<void> {
        await this.LOCATORS.hydrophobicButton.click();
    }

    public async openPopUp(): Promise<void> {
        await this.LOCATORS.openPopUp.click();
    }
}

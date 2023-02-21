import { Component } from '@Core/component';

export class WizardContainer extends Component {
    protected LOCATORS = {
        nonPrescription: this.locator.locator('//h3[normalize-space()="Non-prescription"]'),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backToPrev: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicButton: this.locator.locator('input[value="Super Hydrophobic"]'),
    };

    public async selectOption(): Promise<void> {
        return this.LOCATORS.nonPrescription.click();
    }

    public async continueButton(): Promise<void> {
        return this.LOCATORS.continueButton.click();
    }

    public async backToPrev(): Promise<void> {
        return this.LOCATORS.backToPrev.click();
    }

    public async hydrophobicButton(): Promise<void> {
        return this.LOCATORS.hydrophobicButton.click();
    }
}

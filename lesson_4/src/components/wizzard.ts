import { Component } from '@Core/component';

export class Wizzard extends Component {
    protected LOCATORS = {
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        nonPrescription: this.locator.locator('//div[@role="button" and contains(., "Non-prescription")]'),
        backToPrev: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicButton: this.locator.locator('input[value="Super Hydrophobic"]')
    };

    public async clickNonPrescription(): Promise<void> {
        await this.LOCATORS.nonPrescription.click();
    }

    public async clickContinue(): Promise<void> {
        await this.LOCATORS.continueButton.click();
    }

    public async clickBackToPrev(): Promise<void> {
        await this.LOCATORS.backToPrev.click();
    }

    public async clickSuperHydrophobic(): Promise<void> {
        await this.LOCATORS.hydrophobicButton.click();
    }
}

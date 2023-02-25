import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
        buttonNonPrescription: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        buttonContinue: this.locator.locator('//button[contains(., "Continue")]'),
        backToPrev: this.locator.locator('//button[text() = "Back"]'),
        buttonHydrophobic: this.locator.locator('input[value="Super Hydrophobic"]'),
        buttonPopUpOpen: this.locator.locator(
            '//div[@role="presentation"]//span[@aria-label="Help"]'
        ),
    };

    public async buttonNonPrescriptionClick(): Promise<void> {
        await this.LOCATORS.buttonNonPrescription.waitFor();
        await this.LOCATORS.buttonNonPrescription.click();
    }

    public async buttonContinueClick(): Promise<void> {
        await this.LOCATORS.buttonContinue.click();
    }

    public async backToPrevClick(): Promise<void> {
        await this.LOCATORS.backToPrev.click();
    }

    public async buttonHydrophobicClick(): Promise<void> {
        await this.LOCATORS.buttonHydrophobic.click();
    }

    public async buttonPopUpOpenClick(): Promise<void> {
        await this.LOCATORS.buttonPopUpOpen.click();
    }
}

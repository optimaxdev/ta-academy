import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Wizard extends Component {
    protected LOCATORS = {
        buttonNonPrescription: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        buttonContinue: this.locator.locator('//button[contains(., "Continue")]'),
        backToPrev: this.locator.locator('//button[text() = "Back"]'),
        buttonHydrophobic: this.locator.locator('input[value="Super Hydrophobic"]'),
    };

    public async buttonNonPrescriptionClick() {
        await this.LOCATORS.buttonNonPrescription.click();
    }

    public async buttonContinueClick() {
        await this.LOCATORS.buttonContinue.click();
    }

    public async backToPrevClick() {
        await this.LOCATORS.backToPrev.click();
    }

    public async buttonHydrophobicClick() {
        await this.LOCATORS.buttonHydrophobic.click();
    }
}

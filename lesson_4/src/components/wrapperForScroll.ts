import { Component } from '@Core/component';
import { expect } from '@playwright/test';

export class WrapperForScroll extends Component {
    protected LOCATORS = {
        choiseLenses: this.locator,
        nonPrescriptionButton: this.locator.locator('//h3[text()="Non-prescription"]'),
        continueButton: this.locator.locator('//span[text()="Continue"]'),
        hydrophobicChoiseCheckbox: this.locator.locator('//input[@value= "Super Hydrophobic"]'),
        buttonBack: this.locator.locator('//button[text()="Back"]'),
        inputHydrophobic: this.locator.locator('//input[@value= "Super Hydrophobic"]'),
        popup: this.locator.locator('//div[@role="presentation"]//button[@type="button"]//span[@aria-label="Help"]'),
    };

    public async selectLensesClick(): Promise<void> {
        await this.LOCATORS.choiseLenses.click();
    }

    public async choiseNonPrescription(): Promise<void> {
        await this.LOCATORS.nonPrescriptionButton.click();
    }

    public async continueClick(): Promise<void> {
        await this.LOCATORS.continueButton.click();
    }

    public async checkChoiseCheckbox(): Promise<void> {
        expect(this.LOCATORS.hydrophobicChoiseCheckbox).not.toBeChecked();
    }

    public async clickButtonBack(): Promise<void> {
        await this.LOCATORS.buttonBack.click();
    }

    public async clickInputHydrophobic(): Promise<void> {
        await this.LOCATORS.inputHydrophobic.click();
    }

    public async openPopup(): Promise<void> {
        await this.LOCATORS.popup.click();    }
}
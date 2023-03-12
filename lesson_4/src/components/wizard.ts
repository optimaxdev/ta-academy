/* eslint-disable prettier/prettier */
import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
        prescriptionBtn: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        continueBtn: this.locator.locator('//button[contains(., "Continue")]'),
        backBtn: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicBtn: this.locator.locator('input[value="Super Hydrophobic"]'),
    };

    public async prescriptionClick(): Promise<void> {
        await this.LOCATORS.prescriptionBtn.waitFor();
        await this.LOCATORS.prescriptionBtn.click();
    }
    public async continueClick(): Promise<void> {
        await this.LOCATORS.continueBtn.click();
    }
    public async backClick(): Promise<void> {
        await this.LOCATORS.backBtn.click();
    }
    public async hydrophobicClick(): Promise<void> {
        await this.LOCATORS.hydrophobicBtn.click();
    }
}

import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
        selectNonPrescription: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backButton: this.locator.locator('//button[text() = "Back"]'),
        hydraphobicOption: this.locator.locator('input[value="Super Hydrophobic"]'),
        openPopupButton: this.locator.locator(
            '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
        ),
        addHydrophobicBtn: this.locator.locator('//button//span[contains(., "Add Hydrophobic Coating")]'),
        addedHydrophobicBtn: this.locator.locator('//button[contains(., "Added")]'),
    };

    public async selectNonprescriptionClick(): Promise<void> {
        await this.LOCATORS.selectNonPrescription.click();
    }

    public async continueButtonClick(): Promise<void> {
        await this.LOCATORS.continueButton.click();
    }

    public async backButtonClick(): Promise<void> {
        await this.LOCATORS.backButton.click();
    }

    public async hydraphobicOptionClick(): Promise<void> {
        await this.LOCATORS.hydraphobicOption.click();
    }

    public async openPopupButtonClick(): Promise<void> {
        await this.LOCATORS.openPopupButton.click();
    }

}
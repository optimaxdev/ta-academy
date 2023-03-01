import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
        nonPrescriptionButton: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backButton: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicButton: this.locator.locator('input[value="Super Hydrophobic"]'),
        popUpOpenButton: this.locator.locator(
            '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
        ),
        addHydroPhobicButton: this.page.locator('//span[text() = "Add Hydrophobic Coating"]'),
        addedButton: this.page.locator('//button[contains(@class,"coatingPopup__button")]'),
    };

    public async nonPrescriptionButtonClick(): Promise<void> {
        await this.LOCATORS.nonPrescriptionButton.waitFor();
        await this.LOCATORS.nonPrescriptionButton.click();
    }

    public async continueButtonClick(): Promise<void> {
        await this.LOCATORS.continueButton.click();
    }

    public async backButtonClick(): Promise<void> {
        await this.LOCATORS.backButton.click();
    }

    public async hydrophobicButtonClick(): Promise<void> {
        await this.LOCATORS.hydrophobicButton.click();
    }

    public async popUpOpenButtonClick(): Promise<void> {
        await this.LOCATORS.popUpOpenButton.click();
    }
    public async addHydroPhobicButtonClick(): Promise<void> {
        await this.LOCATORS.addHydroPhobicButton.click();
    }

    public async addedButtonClick(): Promise<void> {
        await this.LOCATORS.addedButton.click();
    }
}

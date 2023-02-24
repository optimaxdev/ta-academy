import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
        wizard: this.locator,
        nonPrescription: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backButton: this.locator.locator('//button[text() = "Back"]'),
        hydrophobicButton: this.locator.locator('input[value="Super Hydrophobic"]'),
        hydrophobicHelpIcon: this.locator.locator('//div[contains(@class, "popupWrapper")]'),
        addHydrophobicCoatingButton: this.locator.locator(
            '//span[text() = "Add Hydrophobic Coating"]'
        ),
        removeHydrophobicCoatingButton: this.locator.locator('//span[text() = "Added"]'),
    };

    public async click(): Promise<void> {
        await this.LOCATORS.wizard.click();
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

    public async goto4step(): Promise<void> {
        await this.LOCATORS.nonPrescription.click();
        await this.LOCATORS.continueButton.click();
        await this.LOCATORS.continueButton.click();
    }

    public async addHydrophobicCoatingWithPopup(): Promise<void> {
        await this.LOCATORS.hydrophobicHelpIcon.click();
        await this.page.click('text="Add Hydrophobic Coating"');
    }

    public async removeHydrophobicCoatingWithPopup(): Promise<void> {
        await this.LOCATORS.hydrophobicHelpIcon.click();
        await this.page.click('text="Added"');
    }
}

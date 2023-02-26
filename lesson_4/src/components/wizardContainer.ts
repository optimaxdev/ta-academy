import { Component } from '@Core/component';

export class WizardContainer extends Component {
    protected LOCATORS = {
        usageGlassesbutton: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        continueBtn: this.locator.locator('//button[contains(., "Continue")]'),
        backBtn: this.locator.locator('//button[text() = "Back"]'),
        hydraphobicBtn: this.locator.locator('input[value="Super Hydrophobic"]'),
        openPopupBtn: this.locator.locator(
            '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
        ),
        addHydrophobicBtn: this.locator.locator('//button[contains(., "Add Hydrophobic Coating")]'),
        addedHydrophobicBtn: this.locator.locator('//button[contains(., "Added")]'),
    };

    public async selectOptionClick(): Promise<void> {
        await this.LOCATORS.usageGlassesbutton.click();
    }

    public async continueButtonClick(): Promise<void> {
        await this.LOCATORS.continueBtn.click();
    }

    public async backButtonClick(): Promise<void> {
        await this.LOCATORS.backBtn.click();
    }

    public async hydraphobicBtnClick(): Promise<void> {
        await this.LOCATORS.hydraphobicBtn.click();
    }

    public async openPopupBtnClick(): Promise<void> {
        await this.LOCATORS.openPopupBtn.click();
    }

    public async addHydrophobicBtnClick(): Promise<void> {
        await this.LOCATORS.addHydrophobicBtn.click();
    }

    public async removeHydrophobicBtnClick(): Promise<void> {
        await this.LOCATORS.addedHydrophobicBtn.click();
    }
}

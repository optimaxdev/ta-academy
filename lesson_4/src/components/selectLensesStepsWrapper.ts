import { Component } from '@Core/component';

export class SelectLensesStepsWrapper extends Component {
    protected LOCATORS = {
        // contactLink: this.locator.locator('//nav//ul//li//a[contains(., "Contacts")]'),
        // contactsLink: this.locator.locator('//a[contains(., "Contacts")]'),
        // sunglassesLink: this.locator.locator('//a[contains(., "Sunglasses")]'),
        nonPrescriptionButton: this.locator.locator('//div[@role="button" and contains(., "Non-prescription")]'),
        continueButton: this.locator.locator('//button[contains(., "Continue")]'),
        backButton: this.locator.locator('//button[text() = "Back"]'),
        SuperHydrophobicCheckbox: this.locator.locator('//input[contains(@value, "Super Hydrophobic")]')

    };


    public async clickNonPrescriptionButton(): Promise<void> {
        await this.LOCATORS.nonPrescriptionButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    public async clickContinueButton(): Promise<void> {
        await this.LOCATORS.continueButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    public async clickBackButton(): Promise<void> {
        await this.LOCATORS.backButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }
    public async superHydrophobickCheck(): Promise<void> {
        await this.LOCATORS.SuperHydrophobicCheckbox.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

}

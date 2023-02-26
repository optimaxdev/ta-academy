import { Container } from '@Core/container';
import { ChooseLenses } from '@Components/chooseLenses';
import { NonPrescription } from '@Components/nonPrescription';
import { ContinueButton } from '@Components/continueButton';
import { BackButton } from '@Components/backButton';
import { SuperHydrophobic } from '@Components/superHydrophobic';

export class ChooseLensesPage extends Container {
    protected LOCATORS = {
        button: this.page.locator('//button[@aria-label="choose lenses"]'),
        nonPrescription: this.page.locator('//div[@role="button" and contains(., "Non-prescription")]'),
        continueButton: this.page.locator('//button[contains(., "Continue")]'),
        backButton: this.page.locator('//button[text() = "Back"]'),
        superHydrophobic: this.page.locator('input[value="Super Hydrophobic"]'),
    };

    public chooseLenses = new ChooseLenses(this.LOCATORS.button, this.page);
    public nonPrescription = new NonPrescription(this.LOCATORS.nonPrescription, this.page);
    public continueButton = new ContinueButton(this.LOCATORS.continueButton, this.page);
    public backButton = new BackButton(this.LOCATORS.backButton, this.page);
    public superHydrophobic = new SuperHydrophobic(this.LOCATORS.superHydrophobic, this.page);
}
import { Container } from '@Core/container';
import { Wizard } from '@Components/wizard';

export class ProductPage extends Container {
    protected LOCATORS = {
        wizard: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        selectLensesButton: this.page.locator('//button[@aria-label="choose lenses"]'),
    };

    public Wizard = new Wizard(this.LOCATORS.wizard, this.page);

    public async selectLensesButtonClick(): Promise<void> {
        await this.LOCATORS.selectLensesButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

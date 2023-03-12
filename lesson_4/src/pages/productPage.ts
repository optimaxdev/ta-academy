/* eslint-disable prettier/prettier */
import { Container } from '@Core/container';
import { Wizard } from '@Components/wizard';

export class ProductPage extends Container {
    protected LOCATORS = {
        wizardContainer: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        selectLensesBtn: this.page.locator('//button[@aria-label="choose lenses"]'),
    };

    public Wizard = new Wizard(this.LOCATORS.wizardContainer, this.page);
    public async buttonSelecetLensesClick(): Promise<void> {
        await this.LOCATORS.selectLensesBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

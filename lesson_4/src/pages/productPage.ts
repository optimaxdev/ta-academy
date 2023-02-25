import { Container } from '@Core/container';
import { Wizard } from '@Components/wizard';
import { PopUpCoating } from '@Components/popUpCoating';

export class ProductPage extends Container {
    protected LOCATORS = {
        wizard: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        popUpCoating: this.page.locator(
            '//div[contains(@class,"coatingPopup__container") and .//h3[text()="Super Hydrophobic Coating"]]'
        ),
        buttonSelectLenses: this.page.locator('//button[@aria-label="choose lenses"]'),
        buttonRevies: this.page.locator('//button[contains(@class,"reviewLinkBlock__reviews")]'),
    };

    public Wizard = new Wizard(this.LOCATORS.wizard, this.page);
    public PopUpCoating = new PopUpCoating(this.LOCATORS.popUpCoating, this.page);

    public async buttonSelecetLensesClick(): Promise<void> {
        await this.LOCATORS.buttonRevies.waitFor();
        await this.LOCATORS.buttonSelectLenses.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

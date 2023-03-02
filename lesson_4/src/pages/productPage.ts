import { Container } from '@Core/container';
import { Wizard } from '@Components/wizard';

export class ProductPage extends Container {
    protected LOCATORS = {
        selectLensesBtn: this.page.locator('//button[@aria-label="choose lenses"]'),
        wizard: this.page.locator(
            '//section[contains(@class, "wizardContainer__container")]'
        ),
        popupAddCoating: this.page.locator('//button//span[contains(., "Add Hydrophobic Coating")]'),
        popupRemoveCoating: this.page.locator('//button[contains(., "Added")]'),
    };

    public wizard = new Wizard(this.LOCATORS.wizard, this.page);

    public async selectLensesBtnClick(): Promise<void> {
        return (
            await this.LOCATORS.selectLensesBtn.click(),
            this.page.waitForLoadState('domcontentloaded')
        );
    }

    public async popupAddCoatingClick(): Promise<void> {
        await this.LOCATORS.popupAddCoating.click();
    }

    public async popupRemoveCoatingClick(): Promise<void> {
        await this.LOCATORS.popupRemoveCoating.click();
    }

}
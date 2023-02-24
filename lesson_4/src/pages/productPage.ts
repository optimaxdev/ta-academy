import { SelectLenses } from '@Components/selectLenses';
import { Wizard } from '@Components/wizard';
import { Container } from '@Core/container';

export class ProductPage extends Container {
    protected LOCATORS = {
        selectLenses: this.page.locator("//button[@aria-label='choose lenses']"),
        wizard: this.page.locator("//section[contains(@class, 'wizardContainer')]"),
    };

    public selectLenses = new SelectLenses(this.LOCATORS.selectLenses, this.page);
    public wizard = new Wizard(this.LOCATORS.wizard, this.page);
}

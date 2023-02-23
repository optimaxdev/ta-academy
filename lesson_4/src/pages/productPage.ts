import { Container } from '@Core/container';
import { Wizard } from '@Components/wizard';
import type { Locator } from '@playwright/test';

export class ProductPage extends Container {
    protected LOCATORS = {
        wizard: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        buttonSelectLenses: this.page.locator('//button[@aria-label="choose lenses"]'),
    };

    public Wizard = new Wizard(this.LOCATORS.wizard, this.page);

    public async buttonSelecetLensesClick() {
        await this.LOCATORS.buttonSelectLenses.click();
    }
    public async open() {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}

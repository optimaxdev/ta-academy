import { Component } from '@Core/component';

export class GlassesSidebar extends Component {
    protected LOCATORS = {
        // contactLink: this.locator.locator('//nav//ul//li//a[contains(., "Contacts")]'),
        selectLenses: this.locator.locator('//button[contains(., "Select Lenses")]')
    };

    public async selectLenses(): Promise<void> {
        await this.LOCATORS.selectLenses.click();
        await this.page.waitForLoadState("domcontentloaded");

    }
   

}

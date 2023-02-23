import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATOR = {
        header: this.locator,
    };

    protected LOCATORS = {
        buttonSunglasses: this.page.locator('//nav//a[contains(., "Sunglasses")]'),
    };

    public async buttonSunglassesClick(): Promise<void> {
        await Promise.all([
            await this.LOCATORS.buttonSunglasses.click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}

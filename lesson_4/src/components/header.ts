import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        buttonSunglasses: this.locator.locator('//a[contains(., "Sunglasses")]'),
        header: this.locator,
    };

    public async buttonSunglassesClick(): Promise<void> {
        await this.LOCATORS.buttonSunglasses.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

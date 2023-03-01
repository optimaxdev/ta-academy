import { Component } from '@Core/component';

export class Header extends Component {
    protected LOCATORS = {
        sunglassesButton: this.locator.locator('//a[contains(., "Sunglasses")]'),
        header: this.locator,
    };

    public async sunglassesButtonClick(): Promise<void> {
        await this.LOCATORS.sunglassesButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

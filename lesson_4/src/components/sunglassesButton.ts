import { Component } from '@Core/component';

export class SunglassesButton extends Component {
    protected LOCATORS = {
        //sunglassesButton: this.locator.locator('//nav//a[contains(., "Sunglasses")]'),
        sunglassesButton: this.locator.locator('//li[contains(., "Sunglasses")]'),
    };

    public async sunglassesButtonClick(): Promise<void> {
        await this.LOCATORS.sunglassesButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
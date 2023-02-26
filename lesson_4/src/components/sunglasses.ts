import { Component } from '@Core/component';

export class Sunglasses extends Component {
    protected LOCATORS = {
        sunglassessBtn: this.locator.locator('//nav//a[contains(., "Sunglasses")]'),
    };

    public async buttonSunglassesClick(): Promise<void> {
        await this.LOCATORS.sunglassessBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

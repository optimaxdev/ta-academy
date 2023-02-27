import { Component } from '@Core/component';

export class Sunglasses extends Component {
    protected LOCATORS = {
        sunglassess: this.locator,
    };

    public async buttonSunglassesClick(): Promise<void> {
        await this.LOCATORS.sunglassess.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

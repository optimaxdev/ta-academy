import { Component } from '@Core/component';

export class SunglasesNavbarButton extends Component {
    protected LOCATOR = {
        sunglasesNavbarButton: this.locator,
    };

    public async gotoCategory(): Promise<void> {
        await Promise.all([
            this.LOCATOR.sunglasesNavbarButton.click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}

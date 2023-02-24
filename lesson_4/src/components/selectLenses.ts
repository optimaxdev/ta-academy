import { Component } from '@Core/component';

export class SelectLenses extends Component {
    protected LOCATOR = {
        selectLensesButton: this.locator,
    };

    public async pushButton(): Promise<void> {
        await this.page.waitForTimeout(4000);
        await this.LOCATOR.selectLensesButton.click();
    }
}

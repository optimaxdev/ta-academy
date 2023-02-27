import { Component } from "@Core/component";
export class ChooseLenses extends Component {
    protected LOCATOR = {
        button: this.locator,
    };
    public async selectLenses(): Promise<void> {
        await this.page.waitForTimeout(10000);
        await this.LOCATOR.button.click(); 
    }
}  
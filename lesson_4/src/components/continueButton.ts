import { Component } from "@Core/component";

export class ContinueButton extends Component {
    protected LOCATOR = {
        continueButton: this.locator,
    };

    public async clickContinue (): Promise<void> {
        await this.LOCATOR.continueButton.click(); 
    }
}   
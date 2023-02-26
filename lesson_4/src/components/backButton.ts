import { Component } from "@Core/component";

export class BackButton extends Component {
    protected LOCATOR = {
        backButton: this.locator,
    };

    public async clickBack (): Promise<void> {
        await this.LOCATOR.backButton.click(); 
    }
}   
import { Component } from '@Core/component';

export class GlassesSidebar extends Component {
    protected LOCATOR = {
        button: this.locator,
    };

    public async selectLenses(): Promise<void> {
        return this.LOCATOR.button.click();
    }
}

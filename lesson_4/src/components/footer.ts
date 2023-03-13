/* eslint-disable prettier/prettier */
import { Component } from '@Core/component';

export class Footer extends Component {
    protected LOCATOR = {
        footer: this.locator,
    };

    public async scrollTo(): Promise<void> {
        await this.LOCATOR.footer.scrollIntoViewIfNeeded();
    }
}

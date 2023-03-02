import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Sidebar extends Component {
    protected LOCATORS = {
        chooseLenses: this.locator.locator('//button[@aria-label="choose lenses"]')
    };

    public async clickChooseLenses(): Promise<void> {
        await this.LOCATORS.chooseLenses.click();
    }
}

import { Component } from '@Core/component';

export class CoatingPopUp extends Component {
    protected LOCATORS = {
        button: this.locator.locator(
            '//button[@class="sc-bBHwJV kMyNyL coatingPopup__button___3YnpG"]'
        ),
    };

    public async popUpButton(): Promise<void> {
        await this.LOCATORS.button.click();
    }
}

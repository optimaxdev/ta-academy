import { Component } from '@Core/component';

export class PopUpCoating extends Component {
    protected LOCATOR = {
        header: this.locator,
    };

    protected LOCATORS = {
        buttonAddHydroPhobicCoating: this.locator.locator(
            '//button[contains(@class,"coatingPopup__button") and ./span[text()="Add Hydrophobic Coating"]]'
        ),
        buttonAdded: this.locator.locator('//button[contains(@class,"coatingPopup__button")]'),
        popUpCoating: this.locator,
    };

    public async buttonAddHydroPhobicCoatingClick(): Promise<void> {
        await this.LOCATORS.buttonAddHydroPhobicCoating.click();
    }

    public async buttonAddedClick(): Promise<void> {
        await this.LOCATORS.buttonAdded.click();
    }
}

import { Component } from '@Core/component';

export class PopUpCoating extends Component {
    protected LOCATOR = {
        header: this.locator,
    };

    protected LOCATORS = {
        buttonPopUpOpen: this.page.locator('//div[@role="presentation"]//span[@aria-label="Help"]'),
        buttonAddHydroPhobicCoating: this.page.locator(
            '//button[contains(@class,"coatingPopup__button") and ./span[text()="Add Hydrophobic Coating"]]'
        ),
        buttonAdded: this.page.locator('//button[contains(@class,"coatingPopup__button")]'),
    };

    public async buttonPopUpOpenClick(): Promise<void> {
        await this.LOCATORS.buttonPopUpOpen.click();
    }

    public async buttonAddHydroPhobicCoatingClick(): Promise<void> {
        await this.LOCATORS.buttonAddHydroPhobicCoating.click();
    }

    public async buttonAddedClick(): Promise<void> {
        await this.LOCATORS.buttonAdded.click();
    }
}

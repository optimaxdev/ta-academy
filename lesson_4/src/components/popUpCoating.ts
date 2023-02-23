import { Component } from '@Core/component';

export class PopUpCoating extends Component {
    protected LOCATOR = {
        header: this.locator,
    };

    protected LOCATORS = {
        buttonPopUpOpen: this.page.locator('//div[@role="presentation"]//span[@aria-label="Help"]'),
        addHydroPhobicCoating: this.page.locator(
            '//button[contains(@class,"coatingPopup__button") and ./span[text()="Add Hydrophobic Coating"]]'
        ),
        addedHydroPhobicCoating: this.page.locator(
            '//button[contains(@class,"coatingPopup__button")]'
        ),
    };

    public async buttonPopUpOpenClick(): Promise<void> {
        await this.LOCATORS.buttonPopUpOpen.click();
    }

    public async addHydroPhobicCoatingClick() {
        await this.LOCATORS.addHydroPhobicCoating.click();
    }

    public async addedHydroPhobicCoatingClick() {
        await this.LOCATORS.addedHydroPhobicCoating.click();
    }
}

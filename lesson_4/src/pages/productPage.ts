
import { CoatingPopup } from '@Components/coatingPopup';
import { WrapperForScroll } from '@Components/wrapperForScroll';
import { Container } from '@Core/container';

export class ProductPage extends Container {
  protected LOCATORS = {
    buttonChoiseLenses: this.page.locator('//button[@aria-label="choose lenses"]'),
    wrapperForScroll: this.page.locator('//div[contains(@class, "steps__wrapperForScroll")]'),
    coatingPopup: this.page.locator('//div[contains(@class,"coatingPopup__container") and .//h3[text()="Super Hydrophobic Coating"]]'),
  };

  public WrapperForScroll = new WrapperForScroll(this.LOCATORS.wrapperForScroll, this.page);
  public CoatingPopup = new CoatingPopup(this.LOCATORS.coatingPopup, this.page);
  
  public async selectLensesClick(): Promise<void> {
    await this.LOCATORS.buttonChoiseLenses.click();
  }
}

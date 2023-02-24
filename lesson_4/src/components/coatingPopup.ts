import { Component } from '@Core/component';

export class CoatingPopup extends Component {
  protected LOCATORS = {
    button: this.locator.locator('//button[@type="button"]'),
  };

  public async changeCoatingForPopup(): Promise<void> {
    await this.LOCATORS.button.click();
  }
}

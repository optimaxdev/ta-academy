import { Container } from '@Core/container';
import { WizardContainer } from '@Components/wizardContainer';

export class ProductPage extends Container {
    protected LOCATORS = {
        selectLensesBtn: this.page.locator('//button[@aria-label="choose lenses"]'),
        wizardContainer: this.page.locator(
            '//section[contains(@class, "wizardContainer__container")]'
        ),
    };

    public WizardContainer = new WizardContainer(this.LOCATORS.wizardContainer, this.page);

    public async selectLensesClick(): Promise<void> {
        return (
            await this.LOCATORS.selectLensesBtn.click(),
            this.page.waitForLoadState('domcontentloaded')
        );
    }
}

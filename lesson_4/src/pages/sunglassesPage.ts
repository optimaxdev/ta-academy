import { CoatingPopUp } from '@Components/coatingPopUp';
import { GlassesSidebar } from '@Components/glassesSidebar';
import { WizardContainer } from '@Components/wizardContainer';
import { Container } from '@Core/container';

export class SunglassesPage extends Container {
    protected LOCATORS = {
        button: this.page.locator('//button[@aria-label="choose lenses"]'),
        wizard: this.page.locator('//div[@class="wizardContainer__content___359It"]'),
        popUp: this.page.locator('//div[@class="coatingPopup__container___1rREx"]'),
    };

    public GlassesSidebar = new GlassesSidebar(this.LOCATORS.button, this.page);
    public WizardContainer = new WizardContainer(this.LOCATORS.wizard, this.page);
    public CoatingPopUp = new CoatingPopUp(this.LOCATORS.popUp, this.page);
}

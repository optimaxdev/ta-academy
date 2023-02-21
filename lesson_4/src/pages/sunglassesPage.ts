import { GlassesSidebar } from '@Components/glassesSidebar';
import { WizardContainer } from '@Components/wizardContainer';
import { Container } from '@Core/container';

export class SunglassesPage extends Container {
    protected LOCATORS = {
        button: this.page.locator('//button[@aria-label="choose lenses"]'),
        wizard: this.page.locator('//div[@class="wizardContainer__content___359It"]'),
    };

    public GlassesSidebar = new GlassesSidebar(this.LOCATORS.button, this.page);
    public WizardContainer = new WizardContainer(this.LOCATORS.wizard, this.page);
}

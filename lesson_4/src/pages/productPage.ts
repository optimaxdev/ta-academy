import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';
import { GlassesSidebar } from '@Components/glassesSidebar';
import { SelectLensesStepsWrapper } from '@Components/selectLensesStepsWrapper';

export class ProductPage extends Container {
    protected LOCATORS = {
        glassesSidebar: this.page.locator('#sidebar'),
        selectLensesStepsWrapper: this.page.locator('//div[contains(@class , "steps__container__")]')
    };



    public GlassesSidebar = new GlassesSidebar(this.LOCATORS.glassesSidebar, this.page)
    public SelectLensesStepsWrapper = new SelectLensesStepsWrapper(this.LOCATORS.selectLensesStepsWrapper, this.page)
    
}

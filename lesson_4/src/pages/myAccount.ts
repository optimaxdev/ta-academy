import { Container } from '@Core/container';
import { MyDetailsSection } from '@Components/myDetailsSection';
import { Locator } from '@playwright/test';

export class MyAccount extends Container {
    protected LOCATORS = {
        myDetails: this.page.locator('[data-id="myDetails"]'),
        myDetailsSection: this.page.locator('[data-testid="section-myDetails"]'),
    };
 
    public myDetailsSection = new MyDetailsSection(this.LOCATORS.myDetailsSection, this.page);

    public async open() {
        await this.page.goto('/customer/account', { waitUntil: 'domcontentloaded' });
    }

    public async clickMyDetails(): Promise<void> {
        await this.LOCATORS.myDetails.click();
    }

}

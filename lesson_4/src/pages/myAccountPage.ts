import { Container } from '@Core/container';
import { MyAccountSideBar } from '@Components/MyAccountSideBar';
import { MyAccountContent } from '@Components/MyAccountContent';

export class MyAccountPage extends Container {
    protected LOCATORS = {
        myAccountSideBar: this.page.locator('//div[contains(@class,"myAccountContent__sidebar")]'),
        myAccountContent: this.page.locator('//div[contains(@class,"myAccountContent__content")]'),
    };

    public myAccountSideBar = new MyAccountSideBar(this.LOCATORS.myAccountSideBar, this.page);
    public myAccountContent = new MyAccountContent(this.LOCATORS.myAccountContent, this.page);
}

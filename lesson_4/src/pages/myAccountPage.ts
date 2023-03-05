import { Container } from '@Core/container';
import { Profile } from '@Components/profile';
import { MyDetails } from '@Components/myDetails';
import { EditMyDetails } from '@Components/editMyDetails';

export class MyAccountPage extends Container {
    protected LOCATORS = {
        profile: this.page.locator('[data-testid="profile"]'),
        myDetails: this.page.locator('[data-testid="section-myDetails"]'),
        editMyDetails: this.page.locator('//div[contains(@class, "card__wrapper___3VrzG")]') ,
    };

    public Profile = new Profile(this.LOCATORS.profile, this.page);
    public MyDetails = new MyDetails(this.LOCATORS.myDetails, this.page);
    public EditMyDetails = new EditMyDetails(this.LOCATORS.editMyDetails, this.page);
}
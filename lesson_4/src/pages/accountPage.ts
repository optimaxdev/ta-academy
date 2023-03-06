import { MyDetails } from '@Components/myDetails';
import { Profile } from '@Components/profile';
import { Container } from '@Core/container';

export class AccountPage extends Container {
  protected LOCATORS = {
    profile: this.page.locator('[data-testid="profile"]'),
    myDetails: this.page.locator('[data-testid="section-myDetails"]'),
  };

  public Profile = new Profile(this.LOCATORS.profile, this.page);
  public MyDetails = new MyDetails(this.LOCATORS.myDetails, this.page);
}

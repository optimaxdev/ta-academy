import { Component } from '@Core/component';

 export class Profile extends Component {
     protected LOCATORS = {
         userNameProfile: this.locator.locator('//div[contains(text(), "Hi")]'),
     };

     public async getUserName(): Promise<string | undefined> {
         return (await this.LOCATORS.userNameProfile.textContent())?.replace('Hi ', '');
     }
 }
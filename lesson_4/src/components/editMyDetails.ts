import { Component } from '@Core/component';

export class EditMyDetails extends Component {
    protected LOCATOR = {
        InputUserDetail: (name: 'First Name' | 'Last Name' | 'Email Address') => this.locator.locator(`//input[@placeholder="${name}"]`),
        button: (name: 'Save' | 'Close' | 'Cansel') => this.locator.locator(`//button[contains(., "${name}")]`),
    };

    public async editUserDetails(nameInput: 'First Name' | 'Last Name' | 'Email Address', newUserDetails: string): Promise<void>  {
        await this.LOCATOR.InputUserDetail(`${nameInput}`).fill(`${newUserDetails}`);
    }
   
    public async clickButton(name: 'Save' | 'Close' | 'Cansel'): Promise<void>  {
        await this.LOCATOR.button(name).click();
    }     
}
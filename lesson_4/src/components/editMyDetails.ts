import { Component } from '@Core/component';

export class EditMyDetails extends Component {
    protected LOCATOR = {
        InputUserDetail: (name: string) => this.locator.locator(`//input[@placeholder="${name}"]`),
        button: (name: string) => this.locator.locator(`//button[contains(., "${name}")]`),
    };

    public async editUserDetails(nameInput: string, newUserDetails:string): Promise<void>  {
        await this.LOCATOR.InputUserDetail(`${nameInput}`).fill(`${newUserDetails}`);
    }
   
    public async clickButton(name: string): Promise<void>  {
        await this.LOCATOR.button(name).click();
    }     
}
import { Component } from '@Core/component';

 export class MyDetails extends Component {
    protected LOCATOR = {
        detailField: (name: 'First Name' | 'Last Name' | 'Email Address') => this.locator.locator(`//div[normalize-space(.)="${name}:"]/following-sibling::div`),
        buttonEditInformation: this.locator.locator('//button[contains(., "Edit Information")]'),
    };

     public async getUserDetail(name: 'First Name' | 'Last Name' | 'Email Address'):Promise<string | null> {
        return await this.LOCATOR.detailField(name).textContent();
    }

    public async openEditInformation(): Promise<void> {
        await this.LOCATOR.buttonEditInformation.click();
    }
 }
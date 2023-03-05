import { Component } from '@Core/component';

 export class MyDetails extends Component {
    protected LOCATOR = {
        detailField: (name: string) => this.locator.locator(`//div[normalize-space(.)="${name}:"]/following-sibling::div`),
        buttonEditInformation: this.locator.locator('//button[contains(., "Edit Information")]'),
    };

     public async getUserDetail(name: string):Promise<string | null> {
        return await this.LOCATOR.detailField(name).textContent();
    }

    public async openEditInformation(): Promise<void> {
        await this.LOCATOR.buttonEditInformation.click();
    }
 }
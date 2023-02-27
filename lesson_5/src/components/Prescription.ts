import { Component } from "@Core/component";
export class NonPrescription extends Component {
   protected LOCATOR = {
      nonPrescription: this.locator,
   };
   public async selectLenses(): Promise<void> {
      await this.LOCATOR.nonPrescription.click(); 
   }
}  
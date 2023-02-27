import { Component } from "@Core/component";
export class SuperHydrophobic extends Component {
    protected LOCATOR = {
        superHydrophobic: this.locator,
    };
    public async selectCoating(): Promise<void> {
        await this.LOCATOR.superHydrophobic.click(); 
    }
}   
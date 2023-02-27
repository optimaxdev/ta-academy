import { Component } from "@Core/component";


export class GlassesCard extends Component {
    protected LOCATOR = {
        product: this.locator,
    };

    public async openFirstProduct(): Promise<void> {
        const allProduct = this.LOCATOR.product.first();
        return await allProduct.click();
    }
}
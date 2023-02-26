import { Component } from "@Core/component";


export class GlassesCard extends Component {
    protected LOCATOR = {
        product: this.locator,
    };

    public async openFirstProduct(): Promise<void> {
        const allProduct = await this.LOCATOR.product.all();
        const firstProduct = allProduct[0];
        return firstProduct.click();
    }
}
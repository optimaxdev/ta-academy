import { Component } from '@Core/component';

export class SunglassesCard extends Component {
    protected LOCATOR = {
        product: this.locator,
    };

    public async getProduct(): Promise<void> {
        await this.LOCATOR.product.click();
    }
}

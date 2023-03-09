import { Component } from '@Core/component';

const SELECTORS = {
    addToCart: '[data-testid="cart"]  button',
};

export class CartBar extends Component {
    public async addToCart(): Promise<void> {
        await this.element.clickByCSS(SELECTORS.addToCart);
    }
}

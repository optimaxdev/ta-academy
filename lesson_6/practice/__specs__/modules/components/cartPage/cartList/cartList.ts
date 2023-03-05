import { CartItem } from '@Components/cartPage/cartList/cartItem/cartItem';
import { Component } from '@Core/component';

const SELECTORS = {
    cartItem: ".//div[@data-testid='cart-item']",
};

export class CartList extends Component {
    public async getCartItems(): Promise<CartItem[]> {
        const cartItems = await this.element.waitForXpath(SELECTORS.cartItem);
        return cartItems.map(item => new CartItem(item));
    }
}

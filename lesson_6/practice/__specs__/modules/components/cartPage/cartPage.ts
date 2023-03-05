import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }
}

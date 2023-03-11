import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { AddItemButton } from '@Components/cartPage/addItemButton/addItemButton';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    addItemButton: ".//button[text()='Add Cart Item']",
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async addCartItem(): Promise<void> {
        await document.clickByXpath(SELECTORS.addItemButton);
    }
}

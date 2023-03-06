import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { AddItemPopup } from '@Components/cartPage/addItemPopup/addItemPopup';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    addItemPopup: './/div[@class="modal__inside"]',
    addCartItemButton: './/button[text()="Add Cart Item"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async getAddItemPopup(): Promise<AddItemPopup> {
        const [modal] = await document.waitForXpath(SELECTORS.addItemPopup);
        return new AddItemPopup(modal);
    }

    public async addCartItemClick(): Promise<void> {
        await document.clickByXpath(SELECTORS.addCartItemButton);
    }
}

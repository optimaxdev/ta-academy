import { CartList } from '@Components/cartPage/cartList/cartList';
import { FillNewItem } from '@Components/cartPage/popUp/fillNewItem';
import { Container } from '@Core/container';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    cartBar: './/button[text()="Add Cart Item"]',
    modalInside: './/div[@data-testid="modal-inside"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async clickAddCartItem(): Promise<FillNewItem> {
        await document.clickByXpath(SELECTORS.cartBar);
        const [popUp] = await document.waitForXpath(SELECTORS.modalInside);
        return new FillNewItem(popUp);
    }
}

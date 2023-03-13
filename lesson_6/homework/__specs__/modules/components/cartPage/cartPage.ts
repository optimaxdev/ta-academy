import { CartList } from '@Components/cartPage/cartList/cartList';
import { FormAddItem } from '@Components/cartPage/modalAddItem/formAddItem';
import { Container } from '@Core/container';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    buttonAddCartItem: './/button[contains(., "Add Cart Item")]',
    modalAddItem: './/div[@data-testid="modal"]'

};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async clickButtonAddCart(): Promise<void> {
        await document.clickByXpath(SELECTORS.buttonAddCartItem);
    }

    public async getModalAddCart(): Promise<FormAddItem> {
        const [modalAddCart] = await document.waitForXpath(SELECTORS.modalAddItem);
        return new FormAddItem(modalAddCart);
    }
}

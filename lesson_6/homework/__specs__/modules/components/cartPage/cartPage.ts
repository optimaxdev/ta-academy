import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { Modal } from '@Components/cartPage/modal/modal';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    modalPopup: './/div[@data-testid="modal"]',
    addCartItemButton: './/div[@data-testid="cart"]//div//button[text()="Add Cart Item"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async getAddCartItemButton(): Promise<void> {
        await document.clickByXpath(SELECTORS.addCartItemButton);
    }

    public async getModalPopup(): Promise<Modal> {
        const [modalPopup] = await document.waitForXpath(SELECTORS.modalPopup);
        return new Modal(modalPopup);
    }
}

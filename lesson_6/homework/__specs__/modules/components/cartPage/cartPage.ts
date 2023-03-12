import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { PopupForm } from '@Components/cartPage/popupForm/popupForm';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    addItemButton: ".//button[text()='Add Cart Item']",
    popupForm: './/div[@data-testid="modal"]',
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

    public async getPopupForm(): Promise<PopupForm> {
        let [popup] = await document.waitForXpath(SELECTORS.popupForm);
        return new PopupForm(popup);
    }
}

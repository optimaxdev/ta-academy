import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { MyCartPopUp } from '@PopUp/myCartPopUp';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    buttonAddCartItem: `//button[text()="Add Cart Item"]`,
    myCartPopUp: '//div[@data-testid="modal-inside"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async openNewCartPopUp(): Promise<MyCartPopUp> {
        await document.clickByXpath(SELECTORS.buttonAddCartItem);
        const popUpElement = document.$x(SELECTORS.myCartPopUp);
        return new MyCartPopUp(popUpElement);
    }
}

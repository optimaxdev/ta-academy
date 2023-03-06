import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { NewCartPopUp } from './popUp/newCartPopUp';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    buttonAddCartItem: `//button[text()="Add Cart Item"]`,
    newCartPopUp: '//div[@data-testid="modal-inside"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async openNewCartPopUp(): Promise<NewCartPopUp> {
        await document.clickByXpath(SELECTORS.buttonAddCartItem);
        const popUpElement = document.$x(SELECTORS.newCartPopUp);
        return new NewCartPopUp(popUpElement);
    }
}

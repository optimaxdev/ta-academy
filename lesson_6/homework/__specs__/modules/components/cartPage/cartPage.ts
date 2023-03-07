import { CartList } from '@Components/cartPage/cartList/cartList';
import { NewCartItem } from '@Components/cartPage/newCartItem/newCartItem';
import { Container } from '@Core/container';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    addItemButton: './/button[contains(., "Add Cart Item")]',
    newCartItem: './/div[@data-testid="modal-inside"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async addNewItemClick(): Promise<void> {
        await document.clickByXpath(SELECTORS.addItemButton);
    }

    public async getNewItemPopup(): Promise<NewCartItem> {
        const [newCartItem] = await document.waitForXpath(SELECTORS.newCartItem);
        return new NewCartItem(newCartItem);
    }
}

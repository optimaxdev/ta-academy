import { CartList } from '@Components/cartPage/cartList/cartList';
import { Container } from '@Core/container';
import { CartBar } from './cartBar/cartBar';
import { ModalInside } from './modal/modal';

const SELECTORS = {
    cartList: './/div[@class="cart__list"]',
    cartBar: '.cart__bar',
    modalInside: '[data-testid="modal-inside"]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState = {}): Promise<void> {
        await super.fulfill(initialState);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public async getCartBar(): Promise<CartBar>{
        const [cartBar] = await document.waitForQuerySelector(SELECTORS.cartBar);
        return new CartBar(cartBar); 
    }

    public async getModalInside(): Promise<ModalInside>{
        const [modalInside] = await document.waitForQuerySelector(SELECTORS.modalInside);
        return new ModalInside(modalInside); 
    }
}

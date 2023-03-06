import { Component } from '@Core/component';

const SELECTORS = {
    buttonAdd: ".//button[text()='+']",
    buttonRemove: ".//button[text()='-']",
    itemQuantity: './/div[@data-testid="quantity-current"]',
};

export class CartItem extends Component {
    public async add(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonAdd);
    }

    public async remove(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonRemove);
    }

    public async getItemQuantity(): Promise<number> {
        const [itemQuantity] = await this.element.waitForXpath(SELECTORS.itemQuantity);
        return Number(itemQuantity.textContent);
    }
}

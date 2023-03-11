import { Component } from '@Core/component';

const SELECTORS = {
    addItemButton: ".//button[text()='Add Cart Item']",
};

export class AddItemButton extends Component {
    public async addCartItem(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.addItemButton);
    }
}

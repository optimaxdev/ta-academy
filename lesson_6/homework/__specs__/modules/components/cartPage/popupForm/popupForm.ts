import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

const SELECTORS = {
    // popup: './/div[@data-testid="modal"]',
    nameField: './/input[@data-testid="input-name"]',
    priceField: './/input[@data-testid="input-price"]',
    quantityField: './/input[@data-testid="input-quantity"]',
    formSubmitButton: './/button[text()="Создать"]',
    formCloseButton: './/button[contains(@class, "modal__close-btn")]',
};

export class PopupForm extends Component {
    // public async getPopupForm(): Promise<Component> {
    //   const popup = await this.element.waitForXpath(SELECTORS.popup)
    //   return popup
    // }
    public async fillFormData({ name, price, quantity }): Promise<void> {
        const [nameField] = await this.element.waitForXpath(SELECTORS.nameField);
        const [priceField] = await this.element.waitForXpath(SELECTORS.priceField);
        const [quantityField] = await this.element.waitForXpath(SELECTORS.quantityField);
        fireEvent.change(nameField, { target: { value: name } });
        fireEvent.change(priceField, { target: { value: price } });
        fireEvent.change(quantityField, { target: { value: quantity } });
    }
    public async submitData(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.formSubmitButton);
    }
    public async close(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.formCloseButton);
    }
}

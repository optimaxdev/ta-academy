import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

const SELECTORS = {
    inputName: './/input[@data-testid="input-name"]',
    inputPrice: './/input[@data-testid="input-price"]',
    inputQuantity: './/input[@data-testid="input-quantity"]',
    buttonAdd: './/button[text()="Создать"]',
    buttonClose: './/button[text()="✕"]',
};

export class FillNewItem extends Component {
    public async fillForm(): Promise<void> {
        const [inputName] = await this.element.waitForXpath(SELECTORS.inputName);
        fireEvent.change(inputName, { target: { value: 'My Beloved Item' } });

        const [inputPrice] = await this.element.waitForXpath(SELECTORS.inputPrice);
        fireEvent.change(inputPrice, { target: { value: 23 } });

        const [inputQuantity] = await this.element.waitForXpath(SELECTORS.inputQuantity);
        fireEvent.change(inputQuantity, { target: { value: 2 } });

        await this.clickButtonCreate();
    }

    public async clickButtonCreate(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonAdd);
    }

    public async clickButtonClose(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonClose);
    }
}

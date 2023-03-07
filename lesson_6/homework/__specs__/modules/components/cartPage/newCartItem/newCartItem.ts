import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

const SELECTORS = {
    inputName: './/input[@data-testid="input-name"]',
    inputPrice: './/input[@data-testid="input-price"]',
    inputQuantity: './/input[@data-testid="input-quantity"]',
    createButton: './/button[contains(., "Создать")]',
    closeButton: './/button[contains(@class, "modal__close-btn")]',
};

export class NewCartItem extends Component {
    public async fillForm(): Promise<void> {
        const [inputName] = await this.element.waitForXpath(SELECTORS.inputName);
        await this.element.waitForXpath(SELECTORS.inputName);
        fireEvent.change(inputName, { target: { value: 'Lenses' } });

        const [inputPrice] = await this.element.waitForXpath(SELECTORS.inputPrice);
        await this.element.waitForXpath(SELECTORS.inputPrice);
        fireEvent.change(inputPrice, { target: { value: 100 } });

        const [inputQuantity] = await this.element.waitForXpath(SELECTORS.inputQuantity);
        await this.element.waitForXpath(SELECTORS.inputQuantity);
        fireEvent.change(inputQuantity, { target: { value: 3 } });
    }

    public async createButtonClick(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.createButton);
    }

    public async closeButtonClick(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.closeButton);
    }
}

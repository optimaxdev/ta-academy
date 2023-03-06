import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

const SELECTORS = {
    inputModal: './/input[@data-testid="input-name"]',
    priceModal: './/input[@data-testid="input-price"]',
    qtyModal: './/input[@data-testid="input-quantity"]',
    btnModal: '//form//button[text()="Создать"]',
    btnClose: './/button[text()="✕"]',
};

export class Modal extends Component {
    public async getFillModalPopup(): Promise<void> {
        const [inputModal] = await this.element.waitForXpath(SELECTORS.inputModal);
        const [priceModal] = await this.element.waitForXpath(SELECTORS.priceModal);
        const [qtyModal] = await this.element.waitForXpath(SELECTORS.qtyModal);

        fireEvent.change(inputModal, {target: {value: 'Item'}});
        fireEvent.change(priceModal, {target: {value: '123'}});
        fireEvent.change(qtyModal, {target: {value: '2'}});
    }

    public async getButtonCreate(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.btnModal);
    }
    
    public async getButtonClose(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.btnClose);
    }
}

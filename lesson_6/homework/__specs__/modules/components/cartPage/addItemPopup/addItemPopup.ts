import {Component} from '@Core/component';

const SELECTORS = {
    inputName: './/input[@data-testid="input-name"]',
    inputPrice: './/input[@data-testid="input-price"]',
    inputQuantity: './/input[@data-testid="input-quantity"]',
    createButton: './/button[text()="Создать"]',
    closeButton: './/button[text()="✕"]',
};

export class AddItemPopup extends Component {
    public async fillFieldsForm(): Promise<void> {
        await this.element.fillByXpath(SELECTORS.inputName, 'Ray-Ban RB2132 New Wayfarer');
        await this.element.fillByXpath(SELECTORS.inputPrice, 151);
        await this.element.fillByXpath(SELECTORS.inputQuantity, 1000);
    }

    public async clickCreateButton(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.createButton);
    }

    public async clickCloseButton(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.closeButton);
    }
}

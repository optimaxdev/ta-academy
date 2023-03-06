import { Component } from '@Core/component';

const SELECTORS = {
    input: (testId: 'input-name' | 'input-price' | 'input-quantity') => `//input[@data-testid="${testId}"]`,
    buttonCreate: '//button[text()="Создать"]',
    buttonCloseForm: '//button[text()="✕"]',
};

export class NewCartPopUp extends Component {
    public async fillForm() {
        await this.element.fillByXpath(SELECTORS.input('input-name'), 'Potato');
        await this.element.fillByXpath(SELECTORS.input('input-price'), '100');
        await this.element.fillByXpath(SELECTORS.input('input-quantity'), '1');
    }

    public async clickButtonCreate(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonCreate);
    }

    public async clickButtonCloseForm(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonCloseForm);
    }
}

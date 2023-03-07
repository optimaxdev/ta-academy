import { Component } from '@Core/component';
import { fireEvent } from '@testing-library/react';

const SELECTORS = {
    inputItem: (name: 'input-name' | 'input-price' | 'input-quantity') => `.//input[@data-testid="${name}"]`,
    buttonCreat:'.//button[contains(., "Создать")]',
    buttonCloseForm:'.//button[contains(., "✕")]',
};

export class FormAddItem extends Component {

    public async fillForm(): Promise<void> {
       const [inputName] =  await this.element.waitForXpath(SELECTORS.inputItem('input-name'));
       fireEvent.change(inputName, {target:{value:'demo-item'}});
       const [inputPrice] =  await this.element.waitForXpath(SELECTORS.inputItem('input-price'));
       fireEvent.change(inputPrice, {target:{value:'1200'}});
       const [inputQuantity] =  await this.element.waitForXpath(SELECTORS.inputItem('input-quantity'));
       fireEvent.change(inputQuantity, {target:{value:'1'}});
    }

    public async clickButtonCreate(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonCreat);
    }

    public async clickButtonCloseForm(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonCloseForm);
    }
}
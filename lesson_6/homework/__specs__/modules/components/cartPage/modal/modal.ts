import { Component } from '@Core/component';

const SELECTORS = {
    create: '.btn_primary',
    close: '.modal__close-btn',
};

export class ModalInside extends Component {
    public async fillAllFields(data: Record<string,string>): Promise<void> {
        for(let key in data){
            await this.element.fillFieldByXpath(`.//input[@data-testid="${key}"]`, data[key]);
        }
    }

    public async clickCreate(): Promise<void>{
        await this.element.clickByCSS(SELECTORS.create);
    }

    public async clickClose(): Promise<void>{
        await this.element.clickByCSS(SELECTORS.close);
    }
}

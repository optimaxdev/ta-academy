import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

const eventOpen = {
	name: "FormInteraction",
	value: "Open"
}

const eventClose = {
	name: "FormInteraction",
	value: "Close"
}

describe('Item decrease & increase on cart page', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Analytics on cart page decrease & increase', async () => {
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();

        window.dataLayer = [];

        const cartBar = await cartPage.getCartBar();
        await cartBar.addToCart();

        expect(window.dataLayer.find(e => e.name === 'FormInteraction')).toMatchObject(eventOpen);

        window.dataLayer = [];

        let modalInside = await cartPage.getModalInside();
        await modalInside.fillAllFields({"input-name": "name", "input-price": "100", "input-quantity": "2"});
        await modalInside.clickCreate();

        expect(window.dataLayer.find(e => e.name === 'FormInteraction')).toMatchObject(eventClose);
        
        window.dataLayer = [];
        await cartBar.addToCart();
        expect(window.dataLayer.find(e => e.name === 'FormInteraction')).toMatchObject(eventOpen);

        window.dataLayer = [];
        modalInside = await cartPage.getModalInside();
        await modalInside.clickClose();

        expect(window.dataLayer.find(e => e.name === 'FormInteraction')).toMatchObject(eventClose);
    });
});

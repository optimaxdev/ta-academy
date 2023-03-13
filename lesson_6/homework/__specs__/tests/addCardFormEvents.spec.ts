import { CartPageContainer } from '@Components/cartPage/cartPage';

describe('form interaction', () => {
    const mockFormData = {
        name: 'Shit',
        price: 100,
        quantity: 5,
    };
    const expectedOpenEvent = {
        name: 'FormInteraction',
        value: 'Open',
    };
    const expectedCloseEvent = {
        name: 'FormInteraction',
        value: 'Close',
    };
    const cartPage = new CartPageContainer();
    beforeEach(async () => {
        await cartPage.fulfill();
        window.dataLayer = [];
    });
    test('check for popup appearing', async () => {
        await cartPage.addCartItem();
        const popup = await cartPage.getPopupForm();
        expect(popup).toBeTruthy();
    });
    test('check for event "FormInteraction - Open"', async () => {
        await cartPage.addCartItem();
        const event = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(event).toMatchObject(expectedOpenEvent);
    });
    test('fill the form fields and check event after submitting', async () => {
        await cartPage.addCartItem();
        const popup = await cartPage.getPopupForm();
        await popup.fillFormData(mockFormData);
        window.dataLayer = [];
        await popup.submitData();
        const closeEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeEvent).toMatchObject(expectedCloseEvent);
    });
    test('check for events when popup opened and closed', async () => {
        await cartPage.addCartItem();
        const openEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(openEvent).toMatchObject(expectedOpenEvent);

        const popup = await cartPage.getPopupForm();
        window.dataLayer = [];
        await popup.close();

        const closeEvent = window.dataLayer.find(e => e.name === 'FormInteraction');

        expect(closeEvent).toMatchObject(expectedCloseEvent);
    });
});

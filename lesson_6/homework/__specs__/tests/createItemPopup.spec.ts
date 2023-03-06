import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Add cards items', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    beforeEach(async() => {
        mock.addMocks(new GetCartItemsMock());
        await cartPage.fulfill();
        window.dataLayer = [];     
    });

    test('Check events when adding an item', async () => {
        reporter.startStep('check open modal event');
        await cartPage.getAddCartItemButton();

        const openEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(openEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        reporter.startStep('check close modal event');
        window.dataLayer = [];

        const cartList = await cartPage.getCartList();
        const itemsLengthBefore = await cartList.getCartItemsLength();

        const modalPopup = await cartPage.getModalPopup();
        await modalPopup.getFillModalPopup();
        await modalPopup.getButtonCreate();

        const itemsLengthAfter = await cartList.getCartItemsLength();
        expect(itemsLengthBefore + 1).toBe(itemsLengthAfter);

        const closeEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();
    });

    test('Check events without adding an item', async () => {
        reporter.startStep('check open modal event');
        await cartPage.getAddCartItemButton();

        const openEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(openEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        reporter.startStep('check close modal event');
        window.dataLayer = [];

        const cartList = await cartPage.getCartList();
        const itemsLengthBefore = await cartList.getCartItemsLength();

        const modalPopup = await cartPage.getModalPopup();
        await modalPopup.getButtonClose();

        const itemsLengthAfter = await cartList.getCartItemsLength();
        expect(itemsLengthBefore).toBe(itemsLengthAfter);

        const closeEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();
    });
});

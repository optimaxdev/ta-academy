import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Create item via pop-up', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Check events in the datalayer when interacting with pop-up', async () => {
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();

        reporter.startStep('Check open pop-up event');
        const addNewItem = await cartPage.clickAddCartItem();
        const openPopUpEvent = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(openPopUpEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        window.dataLayer = [];
        reporter.endStep();

        reporter.startStep('Check close pop-up event');
        await addNewItem.fillForm();
        const closePopUpEvent = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closePopUpEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        window.dataLayer = [];
        reporter.endStep();

        reporter.startStep('Check open pop-up event');
        addNewItem;
        expect(openPopUpEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        window.dataLayer = [];
        reporter.endStep();

        reporter.startStep('Check close pop-up event via button');
        await addNewItem.clickButtonClose();
        expect(closePopUpEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        window.dataLayer = [];
        reporter.endStep();
    });
});

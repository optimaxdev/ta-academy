import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Check events of component NewCartPopUp', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Open popup, fill form, and click create', async () => {
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();

        const newCartPopUp = await cartPage.openNewCartPopUp();

        reporter.startStep('Check event open PopUp');
        let increaseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(increaseEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        window.dataLayer = [];

        await newCartPopUp.fillForm();
        console.log(cartPage.debug());
        await newCartPopUp.clickButtonCreate();

        reporter.startStep('Check event close PopUp click button "создать"');
        increaseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(increaseEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();

        window.dataLayer = [];
    });

    test('open popup and close', async () => {
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();

        const newCartPopUp = await cartPage.openNewCartPopUp();

        reporter.startStep('Check event open PopUp');
        let increaseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(increaseEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        window.dataLayer = [];

        await newCartPopUp.clickButtonCloseForm();

        reporter.startStep('Check event close PopUp(✕)');
        increaseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(increaseEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();
    });
});

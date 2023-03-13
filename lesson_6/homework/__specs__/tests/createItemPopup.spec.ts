import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('check modal window - add cart item ', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Checking the event when opening a modal window and using it to add an item to the cart', async () => {
        
        mock.addMocks(new GetCartItemsMock());

        await cartPage.fulfill();
        await cartPage.clickButtonAddCart();

        reporter.startStep('Check event Open');
        let eventOpenForm = window.dataLayer.find(event => event.name === 'FormInteraction');
        expect(eventOpenForm).toMatchObject({
            name: 'FormInteraction',
            value: `Open`,
        });
        reporter.endStep();

        window.dataLayer = [];
        let modalAddCart = await cartPage.getModalAddCart();
    
        reporter.startStep('Check event Close');
        await modalAddCart.fillForm();
        await modalAddCart.clickButtonCreate();
        let closeModal = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeModal).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();

        window.dataLayer = [];
        await cartPage.clickButtonAddCart();

        reporter.startStep('Check event Open');
        eventOpenForm = window.dataLayer.find(event => event.name === 'FormInteraction');
        expect(eventOpenForm).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        window.dataLayer = [];
        modalAddCart = await cartPage.getModalAddCart();

        reporter.startStep('Check event Close');
        await modalAddCart.clickButtonCloseForm();
        closeModal = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeModal).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();

        window.dataLayer = [];
    })
})
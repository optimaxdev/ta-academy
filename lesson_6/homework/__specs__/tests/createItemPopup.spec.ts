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
        const eventOpenForm = window.dataLayer.find(event => event.name === 'FormInteraction');
        expect(eventOpenForm).toMatchObject({
            name: 'FormInteraction',
            value: `Open`,
        });
        reporter.endStep();

        window.dataLayer = [];
        const modalAddCart = await cartPage.getModalAddCart();
    
        reporter.startStep('Check event Close');
        await modalAddCart.fillForm();
        await modalAddCart.clickButtonCreate();
        const closeModal = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeModal).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();

        window.dataLayer = [];
        await cartPage.clickButtonAddCart();

        reporter.startStep('Check event Open');
        const eventOpenFormTwo = window.dataLayer.find(event => event.name === 'FormInteraction');
        expect(eventOpenFormTwo).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        reporter.endStep();

        window.dataLayer = [];
        const modal = await cartPage.getModalAddCart();

        reporter.startStep('Check event Close');
        await modal.clickButtonCloseForm();
        const closeModalTwo = await window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(closeModalTwo).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        reporter.endStep();

        window.dataLayer = [];
    })
})
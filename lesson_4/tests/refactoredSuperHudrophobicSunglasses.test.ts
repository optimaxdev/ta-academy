import { test } from '@Test';

test.describe('Event checking on sunglasses product page', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, categoryPage, productPage }) => {
        await homePage.open();
        await homePage.sunglassesButton.sunglassesButtonClick();
        await categoryPage.getFirstProduct();
        await productPage.selectLensesBtnClick();
        await productPage.wizard.selectNonprescriptionClick();
        await productPage.wizard.continueButtonClick();
        await productPage.wizard.continueButtonClick();
    });

    test('catch events by steps', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        await productPage.wizard.continueButtonClick();

        await verifyEvent('No Coating Added');

        await productPage.wizard.backButtonClick();
        await productPage.wizard.hydraphobicOptionClick();
        await productPage.wizard.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Add');

        await productPage.wizard.backButtonClick();
        await productPage.wizard.hydraphobicOptionClick();
        await productPage.wizard.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Remove');

        await productPage.wizard.backButtonClick();
        await productPage.wizard.openPopupButtonClick();
        await productPage.popupAddCoatingClick();
        await productPage.wizard.continueButtonClick();

        await verifyEvent('Learn More - Super Hydrophobic');

        await dataLayer.clearDataLayer();
        await productPage.wizard.backButtonClick();
        await productPage.wizard.openPopupButtonClick();
        await productPage.popupRemoveCoatingClick();
        await productPage.wizard.continueButtonClick();

        await verifyEvent('Learn More - Super Hydrophobic');
    });
});
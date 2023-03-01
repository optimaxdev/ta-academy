import { test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, productPage, categoryPage }) => {
        await homePage.open();
        await homePage.Header.sunglassesButtonClick();
        await categoryPage.firstProductClick();
        await productPage.selectLensesButtonClick();
        await productPage.Wizard.nonPrescriptionButtonClick();
        await productPage.Wizard.continueButtonClick();
        await productPage.Wizard.continueButtonClick();
    });

    test('should fire after adding coating and removing it', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        await productPage.Wizard.continueButtonClick();
        await verifyEvent('No Coating Added');

        await productPage.Wizard.backButtonClick();
        await productPage.Wizard.hydrophobicButtonClick();
        await productPage.Wizard.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Add');

        await productPage.Wizard.backButtonClick();
        await productPage.Wizard.hydrophobicButtonClick();
        await productPage.Wizard.continueButtonClick();

        await verifyEvent('Super Hydrophobic - Remove');
    });

    test('test PopUp: visible, add and remove', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await productPage.Wizard.popUpOpenButtonClick();
        await productPage.Wizard.addHydroPhobicButtonClick();
        await productPage.Wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Add - PopUp');

        await productPage.Wizard.backButtonClick();
        await productPage.Wizard.popUpOpenButtonClick();
        await productPage.Wizard.addedButtonClick();
        await productPage.Wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Remove - PopUp');
    });
});

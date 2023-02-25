import { test } from '@Test';

test.describe.only('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, productPage, categoryPage }) => {
        await homePage.open();
        await homePage.Header.buttonSunglassesClick();
        await categoryPage.firstProductClick();
        await productPage.buttonSelecetLensesClick();
        await productPage.Wizard.buttonNonPrescriptionClick();
        await productPage.Wizard.buttonContinueClick();
        await productPage.Wizard.buttonContinueClick();
    });

    test('should fire after adding coating and removing it', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        await productPage.Wizard.buttonContinueClick();
        await verifyEvent('No Coating Added');

        await productPage.Wizard.backToPrevClick();
        await productPage.Wizard.buttonHydrophobicClick();
        await productPage.Wizard.buttonContinueClick();

        await verifyEvent('Super Hydrophobic - Add');

        await productPage.Wizard.backToPrevClick();
        await productPage.Wizard.buttonHydrophobicClick();
        await productPage.Wizard.buttonContinueClick();

        await verifyEvent('Super Hydrophobic - Remove');
    });

    test('test PopUp: visible, add and remove', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await productPage.Wizard.buttonPopUpOpenClick();
        await verifyEvent('Learn More - Super Hydrophobic');

        await productPage.PopUpCoating.buttonAddHydroPhobicCoatingClick();
        await productPage.Wizard.buttonContinueClick();
        await verifyEvent('Super Hydrophobic - Add - PopUp');

        await productPage.Wizard.backToPrevClick();
        await productPage.Wizard.buttonPopUpOpenClick();
        await productPage.PopUpCoating.buttonAddedClick();
        await productPage.Wizard.buttonContinueClick();
        await verifyEvent('Super Hydrophobic - Remove - PopUp');
    });
});

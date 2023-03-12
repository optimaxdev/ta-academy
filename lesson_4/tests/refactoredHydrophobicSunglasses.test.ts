/* eslint-disable prettier/prettier */
import { expect, test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, productPage, categoryPage }) => {
        await homePage.open();
        await homePage.CardSunglasses.buttonSunglassesClick();
        await categoryPage.chooseProduct();
        await productPage.selecetLensesClick();
        await productPage.Wizard.prescriptionClick();
        await productPage.Wizard.continueClick();
        await productPage.Wizard.continueClick();
    });

    test('check events after pressing the continue button on 4 step', async ({
        dataLayer,
        productPage,
    }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        await productPage.Wizard.continueClick();
        await verifyEvent('No Coating Added');

        await productPage.Wizard.backClick();
        await productPage.Wizard.hydrophobicClick();
        await productPage.Wizard.continueClick();

        await verifyEvent('Super Hydrophobic - Add');

        await productPage.Wizard.backClick();
        await productPage.Wizard.hydrophobicClick();
        await productPage.Wizard.continueClick();

        await verifyEvent('Super Hydrophobic - Remove');
    });
});

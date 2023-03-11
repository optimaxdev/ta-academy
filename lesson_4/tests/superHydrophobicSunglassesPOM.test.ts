import { expect, test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, categoryPage, productPage }) => {
        await homePage.open();
        await homePage.NavMenu.clickSunglasses();
        await categoryPage.clickFirstProduct();
        await productPage.GlassesSidebar.selectLenses();
        await productPage.SelectLensesStepsWrapper.clickNonPrescriptionButton();
        await productPage.SelectLensesStepsWrapper.clickContinueButton();
        await productPage.SelectLensesStepsWrapper.clickContinueButton();
    });

    test('should fire after adding coating and removing it', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await productPage.SelectLensesStepsWrapper.clickContinueButton();
        await verifyEvent('No Coating Added');
        await productPage.SelectLensesStepsWrapper.clickBackButton();
        await productPage.SelectLensesStepsWrapper.superHydrophobickCheck();
        await productPage.SelectLensesStepsWrapper.clickContinueButton();
        await verifyEvent('Super Hydrophobic - Add');
        await productPage.SelectLensesStepsWrapper.clickBackButton();
        await productPage.SelectLensesStepsWrapper.superHydrophobickCheck();
        await productPage.SelectLensesStepsWrapper.clickContinueButton();
        await verifyEvent('Super Hydrophobic - Remove');
    });
});

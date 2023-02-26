import { expect, test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ productGlassesPage, chooseLensesPage }) => {
        await productGlassesPage.open('sunglasses');
        await productGlassesPage.glassesCard.openFirstProduct();
        await chooseLensesPage.chooseLenses.selectLenses();
        await chooseLensesPage.nonPrescription.selectLenses();
        await chooseLensesPage.continueButton.clickContinue();
        await chooseLensesPage.continueButton.clickContinue();
    });
    
    test('should fire after adding coating and removing it', async ({ dataLayer, chooseLensesPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await chooseLensesPage.continueButton.clickContinue();
        await verifyEvent('No Coating Added');
        await chooseLensesPage.backButton.clickBack();
        await chooseLensesPage.superHydrophobic.selectCoating();
        await chooseLensesPage.continueButton.clickContinue();
        await verifyEvent('Super Hydrophobic - Add');
        await chooseLensesPage.backButton.clickBack();
        await chooseLensesPage.superHydrophobic.selectCoating();
        await chooseLensesPage.continueButton.clickContinue();
        await verifyEvent('Super Hydrophobic - Remove');
    });
});

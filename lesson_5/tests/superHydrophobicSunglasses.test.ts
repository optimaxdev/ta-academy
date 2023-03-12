import { expect, test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ productGlassesPage, ChooseLensesPage }) => {
        await productGlassesPage.open('sunglasses');
        await productGlassesPage.GlasCard.openFirstProduct();
        await ChooseLensesPage.CLenses.selectLenses();
        await ChooseLensesPage.Prescription.selectLenses();
        await ChooseLensesPage.ContBut.clickContinue();
        await ChooseLensesPage.ContBut.clickContinue();
    });

    test('should fire after adding coating and removing it', async ({ dataLayer, ChooseLensesPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await ChooseLensesPage.ContBut.clickContinue();
        await verifyEvent('No Coating Added');
        await ChooseLensesPage.LBackBut.clickBack();
        await ChooseLensesPage.SupHyd.selectCoating();
        await ChooseLensesPage.ContBut.clickContinue();
        await verifyEvent('Super Hydrophobic - Add');
        await ChooseLensesPage.LBackBut.clickBack();
        await ChooseLensesPage.SupHyd.selectCoating();
        await ChooseLensesPage.ContBut.clickContinue();
        await verifyEvent('Super Hydrophobic - Remove');
    });
});

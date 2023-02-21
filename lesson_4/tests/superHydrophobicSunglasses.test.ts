import { test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ sunglassesCatalogPage, sunglassesPage }) => {
        await sunglassesCatalogPage.open();
        await sunglassesCatalogPage.SunglassesCard.getProduct();

        await sunglassesPage.GlassesSidebar.selectLenses();
        await sunglassesPage.WizardContainer.selectOption();
        await sunglassesPage.WizardContainer.continueButton();
        await sunglassesPage.WizardContainer.continueButton();
    });
    test('should fire after adding coating and removing it', async ({
        dataLayer,
        sunglassesPage,
    }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await sunglassesPage.WizardContainer.continueButton();
        await verifyEvent('No Coating Added');

        await sunglassesPage.WizardContainer.backToPrev();
        await sunglassesPage.WizardContainer.hydrophobicButton();
        await sunglassesPage.WizardContainer.continueButton();
        await verifyEvent('Super Hydrophobic - Add');

        await sunglassesPage.WizardContainer.backToPrev();
        await sunglassesPage.WizardContainer.hydrophobicButton();
        await sunglassesPage.WizardContainer.continueButton();
        await verifyEvent('Super Hydrophobic - Remove');
    });
});

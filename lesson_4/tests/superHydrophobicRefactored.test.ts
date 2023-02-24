import { test } from '@Test';

test.describe('PDPInteraction events', () => {
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ homePage, categoryPage, productPage }) => {
        await homePage.open();
        await homePage.sunglasesNavbarButton.gotoCategory();
        await categoryPage.selectFirstProduct();
        await productPage.selectLenses.pushButton();
        await productPage.wizard.goto4step();
    });

    test('should fire after adding coating and removing it', async ({ dataLayer, productPage }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await productPage.wizard.continueButtonClick();
        await verifyEvent('No Coating Added');
        await productPage.wizard.backButtonClick();
        await productPage.wizard.hydrophobicButtonClick();
        await productPage.wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Add');
        await productPage.wizard.backButtonClick();
        await productPage.wizard.hydrophobicButtonClick();
        await productPage.wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Remove');
    });

    test('adding and removing hydrophobic coating with popup', async ({
        dataLayer,
        productPage,
    }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
        await productPage.wizard.addHydrophobicCoatingWithPopup();
        await productPage.wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Add - PopUp');
        await productPage.wizard.backButtonClick();
        await productPage.wizard.removeHydrophobicCoatingWithPopup();
        await productPage.wizard.continueButtonClick();
        await verifyEvent('Super Hydrophobic - Remove - PopUp');
    });
});

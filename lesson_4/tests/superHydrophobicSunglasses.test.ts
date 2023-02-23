import { expect, test } from '@Test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.only('PDPInteraction events', () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ page, homePage, productPage, categoryPage }) => {
        dataLayer = new DataLayer(page);

        await homePage.open(); //Открываем хомепэйж
        await homePage.Header.buttonSunglassesClick(); //кликаем на кнопку санглас
        await categoryPage.firstProductClick(); // выбираем первое очко
        await productPage.buttonSelecetLensesClick(); // клик выбрать линзу
        await productPage.Wizard.buttonNonPrescriptionClick();
        await productPage.Wizard.buttonContinueClick();
        await productPage.Wizard.buttonContinueClick();
    });
    test('should fire after adding coating and removing it', async ({ page, productPage }) => {
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
});

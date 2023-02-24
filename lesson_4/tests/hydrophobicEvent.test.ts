import { test } from '@Test';

test.describe('catch Hydrophonic Event', async () => {
  const expectedEvent = {
    event: 'PDPInteraction',
    eventCategory: 'PDP - D',
    eventAction: 'Sun Lens Funnel - Step 4: Coating',
  };
  test.beforeEach(async ({ homePage, categoryPage, productPage }) => {
    await homePage.open(); // open homePage
    await categoryPage.open('sunglasses'); // open sunglasses cetegoryPage

    await categoryPage.getFirstProducts(); // click in first product
    await productPage.selectLensesClick() // click select lenses in productPage

    await productPage.WrapperForScroll.choiseNonPrescription(); //select Non-prescription
    await productPage.WrapperForScroll.continueClick(); // Choise lens package, click continue
    await productPage.WrapperForScroll.continueClick(); // Sunglasses lens selection, click continue
  });
  test('catch Hydrophonic Event', async ({ dataLayer, productPage }) => {
    const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

    await productPage.WrapperForScroll.checkChoiseCheckbox(); // check No coating added
    await productPage.WrapperForScroll.continueClick(); // No coating added, click continue
    await verifyEvent('No Coating Added');

    await productPage.WrapperForScroll.clickButtonBack(); // click to back
    await productPage.WrapperForScroll.clickInputHydrophobic(); //Add coating
    await productPage.WrapperForScroll.continueClick(); // Add coating, click continue
    await verifyEvent('Super Hydrophobic - Add');

    await productPage.WrapperForScroll.clickButtonBack(); // click to back
    await productPage.WrapperForScroll.clickInputHydrophobic(); // Remove coating
    await productPage.WrapperForScroll.continueClick(); // Remove coating, click continue
    await verifyEvent('Super Hydrophobic - Remove');

    await productPage.WrapperForScroll.clickButtonBack(); // click to back
    await productPage.WrapperForScroll.openPopup(); // open popup
    await productPage.CoatingPopup.changeCoatingForPopup(); // Add coating for popup
    await productPage.WrapperForScroll.continueClick(); // Add coating for popup, click continue
    await verifyEvent('Super Hydrophobic - Add - PopUp');

    await productPage.WrapperForScroll.clickButtonBack(); // click to back
    await productPage.WrapperForScroll.openPopup(); // open popup
    await productPage.CoatingPopup.changeCoatingForPopup(); // Remove coating for popup
    await productPage.WrapperForScroll.continueClick(); // Remove coating for popup, click continue
    await verifyEvent('Super Hydrophobic - Remove - PopUp');
  });
});
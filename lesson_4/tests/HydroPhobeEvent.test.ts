import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe('test add and remove "Super Hydrophobic coating" of Datalayer', () => {
  test('add and remove coating in form and PopUp', async ({
    page,
  }) => {
    await page.goto('/');
    const dataLayer = new DataLayer(page);

    await test.step('test add coating', async () => {
      const buttonSunGlass = page.locator(
        '//nav[contains(@class,"menu__wrap")]//a[@href="/sunglasses"]'
      );
      await buttonSunGlass.click();

      const firstGlassInList = page.locator(
        '//*[@id="category-items-grid"]/li[1]/div[1]'
      );
      await firstGlassInList.click();

      const buttonSelectLenses = page.locator(
        '//button[@aria-label="choose lenses"]'
      );
      await buttonSelectLenses.waitFor();
      await buttonSelectLenses.click();

      const buttonNonPrescription = page.locator(
        '//h3[contains(text(),"Non-prescription")]'
      );
      await buttonNonPrescription.waitFor();
      await buttonNonPrescription.click();

      const buttonRecomendedPrescription = page.locator(
        '//p[contains(text(),"Recommended for Prescription from -2")]'
      );
      await buttonRecomendedPrescription.click();

      const buttonContinue = page.locator(
        '//span[contains(text(),"Continue")]'
      );
      await buttonContinue.click();
      await buttonContinue.click();

      const checkBoxHydroPhobe = page.locator(
        '//input[@value="Super Hydrophobic"]'
      );
      await checkBoxHydroPhobe.click();
      await buttonContinue.click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Add',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add',
      });

      expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('remove coating', async () => {
      const buttonBack = page.locator(
        '//button[text()="Back"]'
      );
      await buttonBack.click();

      const checkBoxHydroPhobe = page.locator(
        '//input[@value="Super Hydrophobic"]'
      );
      await checkBoxHydroPhobe.click();

      const buttonContinue = page.locator(
        '//span[contains(text(),"Continue")]'
      );
      await buttonContinue.click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Remove',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove',
      });

      expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('Test empty checkbox "add coating"', async () => {
      const buttonBack = page.locator(
        '//button[text()="Back"]'
      );
      await buttonBack.click();

      const buttonContinue = page.locator(
        '//span[contains(text(),"Continue")]'
      );
      await buttonContinue.click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'No Coating Added',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'No Coating Added',
      });

      expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('test popUp add coating', async () => {
      const buttonBack = page.locator(
        '//button[text()="Back"]'
      );
      await buttonBack.click();

      const buttonPopUp = page.locator(
        '//div[@role="presentation"]//span[@aria-label="Help"]'
      );
      await buttonPopUp.click();

      const popUp = page.locator(
        '//div[contains(@class,"coatingPopup__container") and .//h3[text()="Super Hydrophobic Coating"]]'
      );

      const buttonAddHydroPhobicCoating = page.locator(
        '//button[contains(@class,"coatingPopup__button") and ./span[text()="Add Hydrophobic Coating"]]'
      );
      await buttonAddHydroPhobicCoating.click();

      expect(popUp).toBeVisible({ visible: false });

      const buttonContinue = page.locator(
        '//span[contains(text(),"Continue")]'
      );
      await buttonContinue.click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Add - PopUp',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add - PopUp',
      });

      expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('test popUp remove coating', async () => {
      const buttonBack = page.locator(
        '//button[text()="Back"]'
      );
      await buttonBack.click();

      const buttonPopUp = page.locator(
        '//div[@role="presentation"]//span[@aria-label="Help"]'
      );
      await buttonPopUp.click();

      const popUp = page.locator(
        '//div[contains(@class,"coatingPopup__container") and .//h3[text()="Super Hydrophobic Coating"]]'
      );

      const buttonAddedHydroPhobicCoating = page.locator(
        '//button[contains(@class,"coatingPopup__button")]'
      );
      await buttonAddedHydroPhobicCoating.click();

      expect(popUp).toBeVisible({ visible: false });

      const buttonContinue = page.locator(
        '//span[contains(text(),"Continue")]'
      );
      await buttonContinue.click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Remove - PopUp',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove - PopUp',
      });

      expect(event).toStrictEqual(expectedEvent);
    });
  });
});

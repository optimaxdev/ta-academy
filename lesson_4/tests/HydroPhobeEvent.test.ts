import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe.only('????????????????????????', () => {
  test('????????????????????????/', async ({ page }) => {
    await page.goto('/');
    const dataLayer = new DataLayer(page);

    await test.step('check Magazines event "visible" of dataLayer', async () => {
      const buttonSunGlass = page.locator(
        '//nav[@class="menu__wrap___2cbrI"]//a[@href="/sunglasses"]'
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

      const checkButtonSuperHydroPhobe = page.locator(
        '//input[@value="Super Hydrophobic"]'
      );
      await checkButtonSuperHydroPhobe.click();
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

    //тестим назад убираем галку

    await test.step('Remove Hydrophobic', async () => {
      const buttonBack = page.locator(
        '//button[text()="Back"]'
      );
      await buttonBack.click();

      const checkButtonSuperHydroPhobe = page.locator(
        '//input[@value="Super Hydrophobic"]'
      );
      await checkButtonSuperHydroPhobe.click();

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

    // Жмём назад и вперед
    await test.step('????????????????????????', async () => {
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

    /////////////////// popUP
    await test.step('??????????????????????????????', async () => {
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
      const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Learn More - Super Hydrophobic',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Learn More - Super Hydrophobic',
      });

      expect(event).toStrictEqual(expectedEvent);
    });
  });
});

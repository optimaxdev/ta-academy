import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test.describe('check sunglasses event', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const sunglassesButton = await page.$(
      '//nav//a[contains(., "Sunglasses")]'
    );
    await sunglassesButton?.click();
    await page.waitForTimeout(10000);

    const sunglassesItem = await page.$$(
      '//ul[contains(@class, "categoryRows__list")]//a'
    );

    await sunglassesItem[0]?.click();
    await page.waitForTimeout(10000);

    const selectLensesButton = await page.$(
      '//button[@aria-label="choose lenses"]'
    );
    await selectLensesButton?.click();
    await page.waitForTimeout(10000);

    const usageGlassesbutton = await page.$(
      '//div[@role="button" and contains(., "Non-prescription")]'
    );
    await usageGlassesbutton?.click();
    await page.waitForTimeout(10000);

    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();
    await page.waitForTimeout(5000);
    const continueBtn2 = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn2?.click();
    await page.waitForTimeout(10000);
  });

  test('catch "No Coating Added" event', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);
    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    };
    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();
    await page.waitForTimeout(10000);
    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    });

    expect(event).toStrictEqual(expectedEvent);
  });

  test('catch event "Super Hydrophobic - Add"', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);
    const hydrophobicBtn = await page.$(
      'input[value="Super Hydrophobic"]'
    );
    await hydrophobicBtn?.click();
    await page.waitForTimeout(10000);
    const continueBtn3 = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn3?.click();
    await page.waitForTimeout(10000);
    const expectedHydraAddEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Add',
    };
    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Add',
    });
    expect(event).toStrictEqual(expectedHydraAddEvent);
  });

  test('catch event "Super Hydrophobic - Remove"', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const hydrophobicBtn = await page.$(
      'input[value="Super Hydrophobic"]'
    );
    await hydrophobicBtn?.click();
    await page.waitForTimeout(5000);
    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();

    const backButton = await page.$$(
      '//button[contains(., "Back")]'
    );
    await backButton[1]?.click();
    await page.waitForTimeout(5000);

    const hydrophobicBtn2 = await page.$(
      'input[value="Super Hydrophobic"]'
    );
    await hydrophobicBtn2?.click();
    await page.waitForTimeout(10000);

    const continueBtn4 = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn4?.click();

    const expectedHydraAddEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Remove',
    };
    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Remove',
    });
    expect(event).toStrictEqual(expectedHydraAddEvent);
  });

  test('catch event "Super Hydrophobic - Add - PopUp"', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);
    const openPopupBtn = await page.$(
      '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
    );
    await openPopupBtn?.click();
    await page.waitForTimeout(5000);

    const addHydrophobicBtn = await page.$(
      '//button[contains(., "Add Hydrophobic Coating")]'
    );
    await addHydrophobicBtn?.click();
    await page.waitForTimeout(5000);

    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();
    await page.waitForTimeout(10000);

    const expectedHydraAddEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Add - PopUp',
    };
    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Add - PopUp',
    });
    expect(event).toStrictEqual(expectedHydraAddEvent);
  });

  test('catch event "Super Hydrophobic - Remove - PopUp"', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const hydrophobicBtn = await page.$(
      'input[value="Super Hydrophobic"]'
    );
    await hydrophobicBtn?.click();
    await page.waitForTimeout(5000);
    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();

    const backButton = await page.$$(
      '//button[contains(., "Back")]'
    );
    await backButton[1]?.click();
    await page.waitForTimeout(5000);

    const openPopupBtn = await page.$(
      '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
    );
    await openPopupBtn?.click();
    await page.waitForTimeout(5000);

    const addedHydrophobicBtn = await page.$(
      '//button[contains(., "Added")]'
    );
    await addedHydrophobicBtn?.click();
    await page.waitForTimeout(5000);

    const continueBtn2 = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn2?.click();
    await page.waitForTimeout(5000);

    const expectedHydraAddEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Remove - PopUp',
    };
    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Remove - PopUp',
    });
    expect(event).toStrictEqual(expectedHydraAddEvent);
  });
});

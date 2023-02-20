import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test.describe('check sunglasses event', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // await page.waitForURL(
    //   'https://ta-0000-gusa-desktop.gusadev.com',
    //   { waitUntil: 'domcontentloaded' }
    // );
  });
  test('catch event after steps', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    };

    const sunglassesButton = await page.$(
      '//nav//a[contains(., "Sunglasses")]'
    );

    await sunglassesButton?.click();

    const sunglassesItem = await page.$(
      '//ul[contains(@class, "categoryRows__list")]/a[0]'
    );
    await sunglassesItem?.click();

    const selectLensesButton = await page.$(
      '//button[contains(@aria-label, "choose lenses")]'
    );
    await selectLensesButton?.click();

    const usageGlassesbutton = await page.$(
      '//div[contains(@role, "button")][0]'
    );
    await usageGlassesbutton?.click();

    const continueBtn = await page.$(
      '//button[contains(., "Continue")]'
    );
    await continueBtn?.click();
    await continueBtn?.click();
    await continueBtn?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    });

    expect(event).toStrictEqual(expectedEvent);
  });
});

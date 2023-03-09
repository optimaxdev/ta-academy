import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe('sunglasses event', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('check for event', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    };

    await page
      .locator("//nav//a[contains(@href, '/sunglasses')]")
      .click();

    await page.waitForLoadState('domcontentloaded');

    const glassesLinksList = await page.$$(
      "//ul[contains(@class, 'categoryRows__list')]//a"
    );
    await glassesLinksList[0]?.click();
    await page.waitForLoadState('domcontentloaded');

    await page
      .getByRole('button', { name: 'choose lenses' })
      .click();
    await page
      .getByRole('button', {
        name: 'Non-prescription detailed explanation Fashion Non-prescription',
      })
      .click();
    await page
      .getByRole('button', { name: 'Continue' })
      .click();
    await page
      .getByRole('button', { name: 'Continue' })
      .click();
    await page
      .getByRole('button', { name: 'Continue' })
      .click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    });

    expect(event).toStrictEqual(expectedEvent);
  });
});

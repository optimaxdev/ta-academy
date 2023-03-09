import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe('magazines', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto('/');

    // await page.waitForURL(`${baseURL}`, {
    //   waitUntil: 'domcontentloaded',
    // });
  });

  test('check event HPInteraction', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Visible',
    };

    const magazinesBlock = await page.$(
      "//section[contains(.,  'As featured in.')]"
    );

    await magazinesBlock?.scrollIntoViewIfNeeded();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('magazines count is 7', async ({ page }) => {
    const magazines = await page.$$(
      "//ul[contains(@class, 'homeAsFeaturedIn')]/li"
    );

    expect(magazines.length).toBe(7);
  });

  test('event after click on magazine', async ({
    page,
  }) => {
    const magazines = await page.$$(
      "//ul[contains(@class, 'homeAsFeaturedIn')]/li"
    );

    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    const magazinesBlock = await page.$(
      "//section[contains(.,  'As featured in.')]"
    );

    await magazinesBlock?.scrollIntoViewIfNeeded();

    for (const magazine of magazines) {
      await page.evaluate(() => (window.dataLayer = []));
      await magazine.click();

      const [event] = await dataLayer.waitForDataLayer(
        expectedEvent
      );

      expect(event).toStrictEqual(expectedEvent);
    }
  });
});

import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.describe('check HPInteraction events in DataLayer', () => {
  let dataLayer: DataLayer;
  const expectedEvent = {
    event: 'HPInteraction',
    eventAction: 'Magazines',
    eventCategory: 'HP - D',
  };

  test.beforeEach(async ({ page }) => {
    dataLayer = new DataLayer(page);

    await page.goto('/');
    await (
      await page.waitForSelector(
        '//section[contains(., "As featured in.")]'
      )
    ).hover();
    await page.waitForTimeout(1500);
  });
  test('check quantity and event should fire after click each magazine', async ({
    page,
  }) => {
    const verifyEvent =
      dataLayer.createEventVerifier(expectedEvent);
    await verifyEvent('Visible');

    const magazines = await page.$$(
      '//section[contains(., "As featured in.")]//img'
    );
    expect(magazines.length).toBe(7);

    await forEachSeries(magazines, async (magazine) => {
      await page.evaluate(() => (window.dataLayer = []));
      await magazine.click();
      await verifyEvent('Click');
    });
  });
});

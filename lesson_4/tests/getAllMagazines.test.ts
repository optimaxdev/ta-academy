import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('get all magazines, check that there are 7 of them and catch an event on every click', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('get all magazines, check that there are 7 of them', async ({ page }) => {
    const magazines = await page.$$(
      '//*[@id="react-root"]/div[5]/section/ul/li'
    );
    const quantity = magazines.length;
    expect(quantity).toBe(7);
  });

  test('catch an event on every click', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    const magazines = await page.$$(
      '//*[@id="react-root"]/div[5]/section/ul/li'
    );

    magazines.forEach(async (magazine) => {
      await page.evaluate(() => window.dataLayer = []);

      await magazine?.click();

      const [event] = await dataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click',
      });
      
      expect(event).toStrictEqual(expectedEvent);
    });
  });
});

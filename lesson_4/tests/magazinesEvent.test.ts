import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.describe('get all magazines, check that there are 7 of them and catch an event on every click', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('check event in dataLayer when scrolling to the featured block', async ({ page }) => {
    const dataLayer = new DataLayer(page);
  
    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Visible',
    };
  
    await page.waitForTimeout(2000);
  
    await page.mouse.wheel(0, 4700);
    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);
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

    await forEachSeries(magazines, async (magazine) => {
      await page.evaluate(() => window.dataLayer = []);

      await magazine.click();

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

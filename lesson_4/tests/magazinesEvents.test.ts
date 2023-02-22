import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.describe('catch Magazines events', () => {
  test('catch Magazines events', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    await page.goto('/');
    await page.waitForURL('https://ta-0000-gusa-desktop.gusadev.com/', { waitUntil: 'domcontentloaded' });
    await page.locator('.homeAsFeaturedIn__wrapper___1hf1F').scrollIntoViewIfNeeded();

    await test.step('check event Magazines Visible', async () => {
      const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Visible',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventLabel: 'Visible',
      });

      expect(event).toStrictEqual(expectedEvent);
    });
    await test.step('', async () => {
      const expectedEvent = {
        event: "HPInteraction", 
        eventAction: "Magazines",
        eventCategory: "HP - D",
        eventLabel: "Click",
      };
  
      const magazines = await page.locator('.homeAsFeaturedIn__listItem___2cWZJ').all();
      const qty = magazines.length;
      expect(qty).toBe(7);
  
      await forEachSeries(magazines, async(item) => {
        await page.evaluate(() => (window.dataLayer = []));
        await item.click();
  
        const [event] = await dataLayer.waitForDataLayer({
          event: 'HPInteraction',
          eventAction: 'Magazines',
          eventLabel: "Click",
        });
  
        expect(event).toStrictEqual(expectedEvent);
      });
    });
  });
});
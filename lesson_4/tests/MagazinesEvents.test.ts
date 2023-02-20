import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe('Test "As featured in" block', () => {
  test('use event in Datalayer', async ({ page }) => {
    await page.goto('/');

    const dataLayer = new DataLayer(page);

    await test.step('check Magazines event "visible" of dataLayer', async () => {
      const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Visible',
      };
      const listLocatorsOfMagazines = page.locator(
        '//ul[contains(@class,"homeAsFeaturedIn__list")]/li'
      );
      listLocatorsOfMagazines.scrollIntoViewIfNeeded();

      const [event] = await dataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
      });

      expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('Check count of Magazines', async () => {
      const listLocatorsOfMagazines = page.locator(
        '//ul[contains(@class,"homeAsFeaturedIn__list")]/li'
      );

      expect(listLocatorsOfMagazines).toHaveCount(7);
    });

    await test.step('', async () => {
      const listOfMagazines = await page
        .locator(
          '//ul[contains(@class,"homeAsFeaturedIn__list")]/li'
        )
        .all();

      const expectedEventClickMagazine = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click',
      };

      await forEachSeries(
        listOfMagazines,
        async (magazine) => {
          await page.evaluate(
            () => (window.dataLayer = [])
          );
          await magazine.click();

          const [event] = await dataLayer.waitForDataLayer({
            event: 'HPInteraction',
            eventAction: 'Magazines',
            eventLabel: 'Click',
          });

          expect(event).toStrictEqual(
            expectedEventClickMagazine
          );
        }
      );
    });
  });
});

import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test.describe('check magazines block', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('check datalayer event in magazines block', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventCategory: 'HP - D',
      eventAction: 'Magazines',
      eventLabel: 'Visible',
    };

    await page.mouse.wheel(0, 4300);
    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);
  });
  test('quantity of magazines shoul be 7', async ({
    page,
  }) => {
    const magazines = await page.$$(
      '//ul[contains(@class, "homeAsFeaturedIn__list")]/li'
    );

    expect(magazines.length).toBe(7);
  });

  test('check event by click on each magazine', async ({
    page,
  }) => {
    const magazinesSection = await page.$(
      '//section[contains(.,  "As featured in.")]'
    );
    const magazines = await page.$$(
      '//ul[contains(@class, "homeAsFeaturedIn__list")]/li'
    );

    const dataLayer = new DataLayer(page);

    const expectedClickEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await magazinesSection?.scrollIntoViewIfNeeded();

    for (const magazine of magazines) {
      await page.evaluate(() => (window.dataLayer = []));
      await magazine.click();

      const [event] = await dataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventLabel: 'Click',
      });

      expect(event).toStrictEqual(expectedClickEvent);
    }
  });
});

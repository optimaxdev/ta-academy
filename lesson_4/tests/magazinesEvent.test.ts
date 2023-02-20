import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test('Test "As featured in" block', async ({ page }) => {
  await page.goto('/');

  const dataLayer = new DataLayer(page);

  const expectedEvent = {
    event: 'HPInteraction',
    eventAction: 'Magazines',
    eventCategory: 'HP - D',
    eventLabel: 'Visible',
  };

  await page.mouse.wheel(0, 4300);

  const [event] = await dataLayer.waitForDataLayer({
    event: 'HPInteraction',
    eventAction: 'Magazines',
  });
  expect(event).toStrictEqual(expectedEvent);

  const magazines = await page
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

  let counter = 0;
  for await (const magazine of magazines) {
    await page.evaluate(() => (window.dataLayer = []));
    await magazine.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEventClickMagazine);

    counter++;
  }
  expect(counter).toBe(7);
});

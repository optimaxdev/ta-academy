import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
test('check event in dataLayer when scrolling to the featured block', async ({ page }) => {
  const dataLayer = new DataLayer(page);

  const expectedEvent = {
    event: 'HPInteraction',
    eventAction: 'Magazines',
    eventCategory: 'HP - D',
    eventLabel: 'Visible',
  };

  await page.goto('/');
  await page.waitForTimeout(2000);

  await page.mouse.wheel(0, 4700);
  const [event] = await dataLayer.waitForDataLayer({
    event: 'HPInteraction',
    eventAction: 'Magazines',
  });
  expect(event).toStrictEqual(expectedEvent);
});

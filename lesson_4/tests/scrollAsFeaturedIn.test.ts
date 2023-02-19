import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check magazines block', () => {
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

    await page.goto('/');
    await page.waitForTimeout(20000);

    await page.mouse.wheel(0, 3800);
    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);
  });
});

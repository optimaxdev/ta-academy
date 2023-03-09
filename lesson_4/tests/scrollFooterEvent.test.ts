import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test('check event in dataLayer 20% visibility', async ({
  page,
}) => {
  const dataLayer = new DataLayer(page);

  const expectedEvent = {
    event: 'GeneralNonInteraction',
    eventAction: '20% Visible',
    eventCategory: 'Footer - D',
    eventLabel: '',
  };

  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  await page
    .getByRole('contentinfo')
    .scrollIntoViewIfNeeded();
  // await page.mouse.wheel(0, 10000);
  const [event] = await dataLayer.waitForDataLayer({
    event: 'GeneralNonInteraction',
    eventAction: '20% Visible',
  });
  expect(event).toStrictEqual(expectedEvent);
});

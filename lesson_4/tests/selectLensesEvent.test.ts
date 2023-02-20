import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test.describe('check sunglasses event', async () => {
  test('test', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('#page-header')
      .getByRole('link', {
        name: 'Sunglasses',
        exact: true,
      })
      .click();
  });
});

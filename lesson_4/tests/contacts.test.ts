import { expect, test } from '@playwright/test';

test.describe('check amount of product on page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const contactsButton = await page.$(
      '//nav//a[contains(., "Contacts")]'
    );

    await contactsButton?.click();
    await page.waitForLoadState('domcontentloaded');
  });
  test('quantity of product should be 36', async ({
    page,
    baseURL,
  }) => {
    const url = page.url();
    expect(url).toBe(`${baseURL}contact-lenses`);

    const products = await page.$$(
      '[data-test-name="product"]'
    );
    const qty = products.length;
    expect(qty).toBe(36);
  });
});

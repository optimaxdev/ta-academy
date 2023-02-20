import { expect, test } from '@playwright/test';

test.describe('check amount of product on page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contactsButton = page.locator(
      '//nav//a[contains(., "Contacts")]'
    );

    await contactsButton.click();
    await page.waitForURL(
      'https://ta-0000-gusa-desktop.gusadev.com/contact-lenses',
      { waitUntil: 'domcontentloaded' }
    );
  });
  test('quantity of product should be 36', async ({
    page,
    baseURL,
  }) => {
    const url = page.url();
    expect(url).toBe(`${baseURL}contact-lenses`);

    const products = await page
      .locator('[data-test-name="product"]')
      .all();
    const qty = products.length;
    expect(qty).toBe(36);
  });
});

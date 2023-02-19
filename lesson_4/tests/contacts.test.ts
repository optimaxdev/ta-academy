import { expect, test } from '@playwright/test';

test.describe('check amount of product on page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contactsButton = await page.$(
      '//nav//a[contains(., "Contacts")]'
    );

    await contactsButton?.click();
  });
  test('quantity of product should be 36', async ({
    page,
    baseURL,
  }) => {
    const url = page.url();
    expect(url).toBe(`${baseURL}contact-lenses`);

    await page.waitForTimeout(25000);

    const products = await page.$$(
      '[data-test-name="product"]'
    );
    const qty = products.length;
    console.log(products);
    expect(qty).toBe(36);
  });
});

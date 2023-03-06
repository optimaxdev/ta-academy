import { DataLayer } from '@Utils/dataLayer';
import { expect, test } from '@playwright/test';

test.describe('check magazines on main page', () => {
  test.afterEach(async ({ page }) => {
    await page.evaluate(() => (window.dataLayer = []));
  });

  test('check amount magazines', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(5000);
    const magazines = await page.$$(
      "//li[contains(@class, 'homeAsFeaturedIn__list')]"
    );
    expect(magazines.length).toBe(7);
  });

  test('check event in datalayer when scrolling to magazines', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Visible',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    await page.mouse.wheel(0, 4400);
    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click forbes', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$("//img[@alt='Forbes']");
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click CNN', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$("//img[@alt='CNN']");
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click Elle', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$("//img[@alt='Elle']");
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click Esquire', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$("//img[@alt='Esquire']");
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click Business Insider', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$(
      "//img[@alt='Business Insider']"
    );
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('check event in datalayer after click Cosmopolitan', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventCategory: 'HP - D',
      eventLabel: 'Click',
    };

    await page.goto('/');
    await page.waitForTimeout(5000);

    const forbes = await page.$(
      "//img[@alt='Cosmopolitan']"
    );
    await forbes?.click();

    const [event] = await dataLayer.waitForDataLayer({
      event: 'HPInteraction',
      eventAction: 'Magazines',
      eventLabel: 'Click',
    });
    expect(event).toStrictEqual(expectedEvent);
  });
});

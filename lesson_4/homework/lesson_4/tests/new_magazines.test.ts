/* eslint-disable prettier/prettier */
import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test('scroll to the block "As featured in." and catch event', async ({ page }) => {
    const dataLayer = new DataLayer(page);
    const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Visible',
    };

    await page.goto('/');
    await page.mouse.wheel(0, 4500);

    const [event] = await dataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
    });
    expect(event).toStrictEqual(expectedEvent);

    const expectedEventClick = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click',
    };

    const magazines = await page.$$('//li[contains(@class,"homeAsFeaturedIn__listItem")]');
    const quantity = magazines.length;
    expect(quantity).toBe(7);

    await forEachSeries(magazines, async (magazine) => {
        await page.evaluate(() => (window.dataLayer = []));

        await magazine.click();
        const [event] = await dataLayer.waitForDataLayer({
            event: 'HPInteraction',
            eventAction: 'Magazines',
            eventCategory: 'HP - D',
            eventLabel: 'Click',
        });

        expect(event).toStrictEqual(expectedEventClick);
    });
});

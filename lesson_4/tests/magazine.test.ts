import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.describe('HPInteraction event', () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
   "event": "HPInteraction",
   "eventAction": "Magazines",
   "eventCategory": "HP - D",
   "eventLabel": "Visible",
}

    test('should be visible after the scroll', async ({ page }) => {
        dataLayer = new DataLayer(page);

        await page.goto('/');

        const homeAsFeaturedIn = await page.waitForSelector('//section[contains(@class,"homeAsFeaturedIn")]')

        await page.mouse.wheel(0, 4300)

        const neededEvent = await dataLayer.waitForDataLayer({"event": "HPInteraction","eventAction": "Magazines"});

        expect(expectedEvent).toEqual(neededEvent[0]);
        
        const magazines = await page.$$('//li[contains(@class,"homeAsFeaturedIn")]');
        
        await forEachSeries(magazines, async (magazine) => {
            await page.evaluate(() => (window.dataLayer = []));
            await magazine.click();
            const event = await  dataLayer.waitForDataLayer({
                "event": "HPInteraction",
                "eventAction": "Magazines",
                "eventLabel": "Click",
            })

            expect(event[0]).toEqual({
                "event": "HPInteraction",
                "eventAction": "Magazines",
                "eventCategory": "HP - D",
                "eventLabel": "Click",
            })

        })
    });
});

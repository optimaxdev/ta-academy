import { test } from '@Test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('HPInteraction event', () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
   "event": "HPInteraction",
   "eventAction": "Magazines",
   "eventCategory": "HP - D",
   "eventLabel": "Visible",
}

    test.beforeEach(async ({ page }) => {
        dataLayer = new DataLayer(page);

        await page.goto('/');

        const homeAsFeaturedIn = await page.waitForSelector('//section[contains(@class,"homeAsFeaturedIn")]')

        await page.mouse.wheel(0, 4300)

        const neededEvent = dataLayer.createEventVerifier(expectedEvent);
    });
});

import { DataLayer } from '@Utils/dataLayer';
import { expect, test } from '@playwright/test';

test.describe('testing the block - As featured in', () => {
  test.use({ viewport: { height: 1080, width: 1920 } });
    test.beforeEach(async ({ page }) => {
      await page.goto('./');
      await page.waitForTimeout(25000);
    });
      
      test('scroll to the block(As featured in), check event in dataLayer(Magazines-Visible)', async ({page,}) => {
        const dataLayer = new DataLayer(page);
        const expectedEvent = {
          event: "HPInteraction",
          eventAction: "Magazines",
          eventCategory: "HP - D",
          eventLabel: "Visible",    
        };
        await page.mouse.wheel(0, 4600);
        const [event] = await dataLayer.waitForDataLayer({
          event: 'HPInteraction',
          eventAction: 'Magazines',
        });
        expect(event).toStrictEqual(expectedEvent);
      });

      test('Click on all the magazines and catch an event (click)', async ({page,}) => {
        const magazines = await page.locator(
          '//ul[contains(@class, "homeAsFeaturedIn__list")]/li'
        ).all()
        expect(magazines.length).toBe(7);
        const dataLayer = new DataLayer(page);
        const expectedEventClick = {
          event: "HPInteraction",
          eventAction: "Magazines",
          eventCategory: "HP - D",
          eventLabel: "Click",  
        }; 
        for (let magazine of magazines)  {
          await page.evaluate(() => (window.dataLayer = []));
          await magazine.click();
          const [event] = await dataLayer.waitForDataLayer({
            event: 'HPInteraction',
            eventAction: 'Magazines',
            eventLabel: 'Click',
          });
          expect(event).toStrictEqual(expectedEventClick);
        };
      })    
});
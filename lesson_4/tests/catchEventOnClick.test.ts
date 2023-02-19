import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test.describe('название блока', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.waitForTimeout(5000);
      
      test('прокрутка до блока вниз', async ({
        page,
      }) => {
        const dataLayer = new DataLayer(page);
      
        const expectedEvent = {
            event: "HPInteraction",
            eventAction: "Magazines",
            eventCategory: "HP - D",
            eventLabel: "Visible",    
        };
      
       
        await page.mouse.wheel(0, 4200);
        const [event] = await dataLayer.waitForDataLayer({
          event: 'HPInteraction',
          eventAction: 'Magazines',
        });
        expect(event).toStrictEqual(expectedEvent);
      });
      
    });
});
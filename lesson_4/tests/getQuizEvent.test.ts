import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test('check event in dataLayer in the quiz', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    await page.goto('/sunglasses');
    await page.waitForTimeout(3000);

    // select sunglasses
    await page.click('[data-test-name="product"]');
    // click Select Lenses button 
    await page.click('//*[@id="sidebar"]/div[1]/div[6]/div[1]/div/div/button');
    // select Fashion item
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div/div[1]');
    // click Continue button
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[4]/div/button');
    // click Continue button again
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[4]/div/button');
    // choose Super Hydrophobic
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[1]/div/div[1]/label/input');
    // click Continue button
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[2]/div/button');

    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Add'
    };

    const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    });
    expect(event).toStrictEqual(expectedEvent);
  });
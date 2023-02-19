import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test('check event in dataLayer in the quiz from PopUp', async ({ page }) => {
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
    // click on PopUp
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[1]/div/div[1]/div/div/div/button');
    // choose Super Hydrophobic from PopUp 
    await page.click('//button[@class="sc-bBHwJV kMyNyL coatingPopup__button___3YnpG"]');
    // click Continue button
    await page.click('//*[@id="react-root"]/section/div/div/div/div/div/div[2]/div/button');

    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'Super Hydrophobic - Add - PopUp',
    };

    const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D'
    });
    expect(event).toStrictEqual(expectedEvent);
  });
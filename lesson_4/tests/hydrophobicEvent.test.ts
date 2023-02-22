import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('catch Hydrophonic Event', async () => {
  test('catch Hydrophonic Event', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    await page.goto('/');
    await page.locator('//nav//a[contains(., "Sunglasses")]').click();
    await page.locator('//*[@id="category-items-grid"]/li[1]/div[1]').click();
    await page.locator('//button[@aria-label="choose lenses"]').click();
    await page.locator('//h3[text()="Non-prescription"]').click();    
    await page.locator('//span[text()="Continue"]').click();
    await page.locator('//span[text()="Continue"]').click();
    
    await test.step('Step 4: No Coating Added', async () => {
      const expectedEvent = {
        event: 'PDPInteraction',
        eventCategory: 'PDP - D',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'No Coating Added',
      };

      const hydrophobicChoiseCheckbox = page.locator('//input[@value= "Super Hydrophobic"]');
      expect(hydrophobicChoiseCheckbox).not.toBeChecked();

      await page.locator('//span[text()="Continue"]').click();
  
      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'No Coating Added',
      });
      expect(event).toStrictEqual(expectedEvent);
    });
    await test.step('Step 4: Add coating', async () => {
      await page.locator('//button[text()="Back"]').click();
      await page.locator('//input[@value= "Super Hydrophobic"]').click();
      await page.locator('//span[text()="Continue"]').click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventCategory: 'PDP - D',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add',
      });
      expect(event).toStrictEqual(expectedEvent);
    });
    await test.step('Step 4: Remove coating', async () => {
      await page.locator('//button[text()="Back"]').click();
      await page.locator('//input[@value= "Super Hydrophobic"]').click();
      await page.locator('//span[text()="Continue"]').click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventCategory: 'PDP - D',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove',
      });
      expect(event).toStrictEqual(expectedEvent);
    });
    await test.step('Step 4: Add coating from popup coating', async () => {
      await page.locator('//button[text()="Back"]').click();
      await page.locator('//div[@role="presentation"]//button//span[@aria-label="Help"]').click();     
      await page.locator('.coatingPopup__button___3YnpG').click();
      await page.locator('//span[text()="Continue"]').click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventCategory: 'PDP - D',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add - PopUp',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Add - PopUp',
      });
      expect(event).toStrictEqual(expectedEvent);
    });
    await test.step('Step 4: Remove coating from popup coating', async () => {
      await page.locator('//button[text()="Back"]').click();
      await page.locator('//div[@role="presentation"]//button//span[@aria-label="Help"]').click();
      await page.locator('.coatingPopup__button___3YnpG').click();
      await page.locator('//span[text()="Continue"]').click();

      const expectedEvent = {
        event: 'PDPInteraction',
        eventCategory: 'PDP - D',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove - PopUp',
      };

      const [event] = await dataLayer.waitForDataLayer({
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventLabel: 'Super Hydrophobic - Remove - PopUp',
      });
      expect(event).toStrictEqual(expectedEvent);
    });
  });
});
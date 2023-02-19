import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check event in dataLayer in the quiz', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        //go sunglasses page
        await page.click('//nav//a[@href="/sunglasses"]');
        // select sunglasses
        await page.click('[data-test-name="product"]');
        // click Select Lenses button 
        await page.click('//button[@aria-label="choose lenses"]');
        // select Fashion item
        await page.click('//h3[normalize-space()="Non-prescription"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
        // click Continue button again
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
    });

    test('Super Hydrophobic - Add', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // choose Super Hydrophobic
        await page.click('//input[@value="Super Hydrophobic"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
    
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

    test('Super Hydrophobic - Remove', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // choose Super Hydrophobic
        await page.click('//input[@value="Super Hydrophobic"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
        // click Back button
        await page.click('//button[normalize-space()="Back"]');
        // deselect Super Hydrophobic
        await page.click('//input[@value="Super Hydrophobic"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
    
        const expectedEvent = {
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'Super Hydrophobic - Remove'
        };
    
        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'Super Hydrophobic - Remove'
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    test('No Coating Added', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
    
        const expectedEvent = {
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'No Coating Added'
        };
    
        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    test('Learn More - Super Hydrophobic', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // click on PopUp
        await page.click('//div[@role="presentation"]//button[@type="button"]');
    
        const expectedEvent = {
            event: "PDPInteraction",
            eventCategory: "PDP - D",
            eventAction: "Sun Lens Funnel - Step 4: Coating",
            eventLabel: "Learn More - Super Hydrophobic",
        };
    
        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventCategory: 'PDP - D',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventLabel: "Learn More - Super Hydrophobic",
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    test('Super Hydrophobic - Add - PopUp', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // click on PopUp
        await page.click('//div[@role="presentation"]//button[@type="button"]');
        // choose Super Hydrophobic from PopUp 
        await page.click('//button[@class="sc-bBHwJV kMyNyL coatingPopup__button___3YnpG"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
    
        const expectedEvent = {
            event: "PDPInteraction",
            eventCategory: "PDP - D",
            eventAction: "Sun Lens Funnel - Step 4: Coating",
            eventLabel: "Super Hydrophobic - Add - PopUp",
        };
    
        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventCategory: 'PDP - D',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventLabel: "Super Hydrophobic - Add - PopUp",
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    test('Super Hydrophobic - Remove - PopUp', async ({ page }) => {
        const dataLayer = new DataLayer(page);
        // click on PopUp
        await page.click('//div[@role="presentation"]//button[@type="button"]');
        // choose Super Hydrophobic from PopUp 
        await page.click('//button[@class="sc-bBHwJV kMyNyL coatingPopup__button___3YnpG"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');
        // click Back button
        await page.click('//button[normalize-space()="Back"]');
        // click on PopUp
        await page.click('//div[@role="presentation"]//button[@type="button"]');
        // deselect Super Hydrophobic
        await page.click('//button[@class="sc-bBHwJV kMyNyL coatingPopup__button___3YnpG"]');
        // click Continue button
        await page.click('//button[@class="sc-bBHwJV ikYUjs"]');

        const expectedEvent = {
            event: "PDPInteraction",
            eventCategory: "PDP - D",
            eventAction: "Sun Lens Funnel - Step 4: Coating",
            eventLabel: "Super Hydrophobic - Remove - PopUp",
        };

        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventCategory: 'PDP - D',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventLabel: "Super Hydrophobic - Remove - PopUp",
        });
        expect(event).toStrictEqual(expectedEvent);
    });
})
import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test('check event in dataLayer in the quiz using test.step ', async ({ page }) => {
    await page.goto('/');
    const dataLayer = new DataLayer(page);
    
    await test.step('Super Hydrophobic - Add', async () => {
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

    await test.step('Super Hydrophobic - Remove', async () => {
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

    await test.step('No Coating Added', async () => {
        // click Back button
        await page.click('//button[normalize-space()="Back"]');
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
            eventLabel: 'No Coating Added'
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('Learn More - Super Hydrophobic', async () => {
        // click Back button
        await page.click('//button[normalize-space()="Back"]');
        // click on PopUp
        await page.click('//div[@role="presentation"]//button[@type="button"]');
    
        const expectedEvent = {
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'Learn More - Super Hydrophobic'
        };
    
        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'Learn More - Super Hydrophobic'
        });
        expect(event).toStrictEqual(expectedEvent);
    });

    await test.step('Super Hydrophobic - Add - PopUp', async () => {
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

    await test.step('Super Hydrophobic - Remove - PopUp', async () => {
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
});
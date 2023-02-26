import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { forEachSeries } from 'p-iteration';

test.describe('PDPInteraction event', () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
    event: "PDPInteraction",
    eventAction: "Sun Lens Funnel - Step 4: Coating",
    eventCategory: "PDP - D",
    eventLabel: "Super Hydrophobic - Add",
}
    const expectedEventPopup = {
    event: "PDPInteraction",
    eventAction: "Sun Lens Funnel - Step 4: Coating",
    eventCategory: "PDP - D",
    eventLabel: "Super Hydrophobic - Add - PopUp",
}

    test.beforeEach(async ({ page }) => {

        await page.goto('/');

        const sunglasses = await page.waitForSelector("//span/span[contains(text(), 'Sunglasses')]", {state: 'attached'});
        await sunglasses.click();

        await page.waitForLoadState('domcontentloaded');

        const glassesItems = await page.waitForSelector("//li/div[contains(@class, 'glassesItem')]", {state: 'attached'});
        await glassesItems.click();

        await page.waitForLoadState('domcontentloaded');

        const selectLenses = await page.waitForSelector("//button[contains(@aria-label, 'choose lenses')]", {state: 'attached'});
        await selectLenses.click();

        const prescription = await page.waitForSelector("//h3[contains(text(), 'Non-prescription')]", {state: 'attached'});
        await prescription.click();

        const lensPackage = await page.waitForSelector("//h2[contains(text(), 'Basic')]", {state: 'attached'});
        await lensPackage.click();

        const packagesContinueBtn = await page.waitForSelector("//div[contains(@class, 'packagesContinueBtn')]/Button", {state: 'attached'});
        await packagesContinueBtn.click();

        const continueButton = await page.waitForSelector("//div[contains(@class, 'sunglassesLens')]/Button", {state: 'attached'});
        await continueButton.click();
    })

    test('should be sent after click continue button', async ({ page }) => {
        dataLayer = new DataLayer(page);

        const checkbox = await page.waitForSelector('//*[contains(@class, "wizardSelectBox")]');
        await checkbox.click();

        await page.evaluate(() => (window.dataLayer = []));

        const coatingsScreen = await page.waitForSelector("//div[contains(@class, 'coatingsScreen')]/Button", {state: 'attached'});       
        await coatingsScreen.click();

        const neededEvent = await dataLayer.waitForDataLayer({"event": "PDPInteraction"});

        expect(expectedEvent).toEqual(neededEvent[0]);

        await page.close();

    });

    test('should be sent after click continue button with added from popup', async ({ page }) => {
        dataLayer = new DataLayer(page);

        const wizardSeelctBox = await page.waitForSelector('//div[contains(@class, "wizardSelectBox")]');
        
        const questionMark = await wizardSeelctBox.waitForSelector('//*[contains(@class, "questionMark")]');
        await questionMark.click();

        const addHydrophobic = await page.waitForSelector('//button[contains(@class, "coatingPopup")]');
        await addHydrophobic.click();

        await page.evaluate(() => (window.dataLayer = []));

        const coatingsScreen = await page.waitForSelector("//div[contains(@class, 'coatingsScreen')]/Button", {state: 'attached'});       
        await coatingsScreen.click();

        const neededEvent = await dataLayer.waitForDataLayer({"event": "PDPInteraction"});

        expect(expectedEventPopup).toEqual(neededEvent[0]);

        await page.close();

    });
});

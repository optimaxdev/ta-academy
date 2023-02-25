import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe.configure({ mode: 'serial' });

test.describe('check sunglasses event', async () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };
    test.beforeEach(async ({ page }) => {
        dataLayer = new DataLayer(page);
        await page.goto('/');

        const sunglassesButton = await page.waitForSelector('//nav//a[contains(., "Sunglasses")]');
        await Promise.all([sunglassesButton.click(), page.waitForLoadState('domcontentloaded')]);

        const sunglassesItem = await page.waitForSelector(
            '//ul[contains(@class, "categoryRows__list")]//a'
        );
        await Promise.all([sunglassesItem.click(), page.waitForLoadState('domcontentloaded')]);

        await page.waitForTimeout(10000);
        const selectLensesButton = await page.waitForSelector(
            '//button[@aria-label="choose lenses"]'
        );
        await selectLensesButton?.click();
        await page.waitForTimeout(5000);
        const usageGlassesbutton = await page.waitForSelector(
            '//div[@role="button" and contains(., "Non-prescription")]'
        );
        await usageGlassesbutton?.click();

        let continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(5000);
        continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(10000);
    });

    test('catch events by steps', async ({ page }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        let continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(10000);

        await verifyEvent('No Coating Added');

        let backButton = await page.waitForSelector('//button[text() = "Back"]');
        await backButton?.click();

        let hydrophobicBtn = await page.waitForSelector('input[value="Super Hydrophobic"]');
        await hydrophobicBtn?.click();

        continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();

        await verifyEvent('Super Hydrophobic - Add');

        backButton = await page.waitForSelector('//button[text() = "Back"]');
        await backButton?.click();

        hydrophobicBtn = await page.waitForSelector('input[value="Super Hydrophobic"]');
        await hydrophobicBtn?.click();

        continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(10000);

        await verifyEvent('Super Hydrophobic - Remove');

        backButton = await page.waitForSelector('//button[text() = "Back"]');
        await backButton?.click();

        let openPopupBtn = await page.waitForSelector(
            '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
        );
        await openPopupBtn?.click();

        let addHydrophobicBtn = await page.waitForSelector(
            '//button[contains(., "Add Hydrophobic Coating")]'
        );
        await addHydrophobicBtn?.click();

        continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(10000);

        await verifyEvent('Super Hydrophobic - Add - PopUp');

        backButton = await page.waitForSelector('//button[text() = "Back"]');
        await backButton?.click();

        openPopupBtn = await page.waitForSelector(
            '//div[@role="presentation"]//span[@data-test-name="questionMark"]'
        );
        await openPopupBtn?.click();

        let addedHydrophobicBtn = await page.waitForSelector('//button[contains(., "Added")]');
        await addedHydrophobicBtn?.click();

        continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn?.click();
        await page.waitForTimeout(10000);

        await verifyEvent('Super Hydrophobic - Remove - PopUp');
    });
});

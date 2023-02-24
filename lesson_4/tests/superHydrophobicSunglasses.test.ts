import { test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('PDPInteraction events', () => {
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

        const product = await page.waitForSelector('[data-test-name="product"]');
        await Promise.all([product.click(), page.waitForLoadState('domcontentloaded')]);

        await page.waitForTimeout(5000);
        const chooseLenses = await page.waitForSelector('//button[@aria-label="choose lenses"]');
        await chooseLenses.click();

        const nonPrescription = await page.waitForSelector(
            '//div[@role="button" and contains(., "Non-prescription")]'
        );
        await nonPrescription.click();

        let continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();

        await page.waitForTimeout(2000);
        continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();
    });

    test('should fire after adding coating and removing it', async ({ page }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        let continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();

        await verifyEvent('No Coating Added');

        let backToPrev = await page.waitForSelector('//button[text() = "Back"]');
        await backToPrev.click();

        let hydrophobicButton = await page.waitForSelector('input[value="Super Hydrophobic"]');
        await hydrophobicButton.click();

        continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();

        await verifyEvent('Super Hydrophobic - Add');

        backToPrev = await page.waitForSelector('//button[text() = "Back"]');
        await backToPrev.click();

        hydrophobicButton = await page.waitForSelector('input[value="Super Hydrophobic"]');
        await hydrophobicButton.click();

        continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();

        await verifyEvent('Super Hydrophobic - Remove');
    });
});

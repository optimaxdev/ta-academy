/* eslint-disable prettier/prettier */
import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('Check events for sunglasses', () => {
    let dataLayer: DataLayer;
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
        eventLabel: 'No Coating Added',
    };

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const sunglassesBtn = await page.waitForSelector('//nav//a[@href="/sunglasses"]');
        await sunglassesBtn.click();
        page.waitForTimeout(5000);

        const someSunglasses = await page.waitForSelector('[data-test-name="product"]');
        await someSunglasses.click();
        await page.waitForLoadState('domcontentloaded');

        await page.waitForTimeout(4000);

        const selectLensesBtn = await page.waitForSelector('//button[@aria-label="choose lenses"]');
        await selectLensesBtn.click();

        const prescriptionBtn = await page.waitForSelector('//h3[contains(.,"Non-prescription")]');
        await prescriptionBtn.click(); //step 1

        const chooseLensBtn = await page.waitForSelector('//h2[contains(.,"Basic")]');
        await chooseLensBtn.click(); //step 3 lens package

        const continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn.click(); //step 3 lens package continue button

        await page.waitForTimeout(4000);

        const selectionContinueBtn = await page.waitForSelector(
            '//button[contains(., "Continue")]'
        );
        await selectionContinueBtn.click(); //step 3 lens selection continue button
    });

    test('check event after pressing the Continue button on 4 step', async ({ page }) => {
        const dataLayer = new DataLayer(page);

        const continueBtn = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueBtn.click(); //step 3 lens selection continue button

        const [event] = await dataLayer.waitForDataLayer({
            event: 'PDPInteraction',
            eventAction: 'Sun Lens Funnel - Step 4: Coating',
            eventCategory: 'PDP - D',
            eventLabel: 'No Coating Added',
        });
        expect(event).toStrictEqual(expectedEvent);

        const backBtn = await page.waitForSelector('//button[contains(., "Back")]');
        await backBtn.click();

        const hydrophobicButton = await page.waitForSelector('input[value="Super Hydrophobic"]');
        await hydrophobicButton.click();

        continueButton = await page.waitForSelector('//button[contains(., "Continue")]');
        await continueButton.click();
    });
});

import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('check add and remove hydrophobic event', () => {
  test('No Coating Added', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'No Coating Added',
    };

    await page.goto('/');
    await page.click('text="Sunglasses"');
    await page.waitForTimeout(10000);
    const glasses = await page.$(
      "//img[@alt='Ray-Ban RB2132 New Wayfarer '][1]"
    );
    glasses?.click();
    await page.waitForTimeout(10000);
    await page.click('text="Select Lenses"');
    await page.waitForTimeout(5000);
    await page.click('text="Non-prescription"');
    await page.waitForTimeout(5000);
    await page.click('text="Continue"');
    await page.click('text="Continue"');
    await page.click('text="Continue"');

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'No Coating Added',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('Super Hydrophobic - Add', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Add',
    };

    await page.goto('/');
    await page.click('text="Sunglasses"');
    await page.waitForTimeout(10000);
    const glasses = await page.$(
      "//img[@alt='Ray-Ban RB2132 New Wayfarer '][1]"
    );
    glasses?.click();
    await page.waitForTimeout(10000);
    await page.click('text="Select Lenses"');
    await page.waitForTimeout(5000);
    await page.click('text="Non-prescription"');
    await page.waitForTimeout(5000);
    await page.click('text="Continue"');
    await page.click('text="Continue"');
    await page.getByRole('checkbox').setChecked(true);
    await page.click('text="Continue"');

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Add',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('Super Hydrophobic - Remove', async ({ page }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Remove',
    };

    await page.goto('/');
    await page.click('text="Sunglasses"');
    await page.waitForTimeout(10000);
    const glasses = await page.$(
      "//img[@alt='Ray-Ban RB2132 New Wayfarer '][1]"
    );
    glasses?.click();
    await page.waitForTimeout(10000);
    await page.click('text="Select Lenses"');
    await page.waitForTimeout(5000);
    await page.click('text="Non-prescription"');
    await page.waitForTimeout(5000);
    await page.click('text="Continue"');
    await page.click('text="Continue"');
    await page.getByRole('checkbox').setChecked(true);
    await page.click('text="Continue"');
    await page.click('text="Back"');
    await page.getByRole('checkbox').setChecked(false);
    await page.click('text="Continue"');

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Remove',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('Super Hydrophobic - Adding with PopUp', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Add - PopUp',
    };

    await page.goto('/');
    await page.click('text="Sunglasses"');
    await page.waitForTimeout(10000);
    const glasses = await page.$(
      "//img[@alt='Ray-Ban RB2132 New Wayfarer '][1]"
    );
    glasses?.click();
    await page.waitForTimeout(10000);
    await page.click('text="Select Lenses"');
    await page.waitForTimeout(5000);
    await page.click('text="Non-prescription"');
    await page.waitForTimeout(5000);
    await page.click('text="Continue"');
    await page.click('text="Continue"');
    const helpIcon = await page.$(
      "//div[@role='presentation']/button/span[@data-test-name='questionMark']"
    );
    helpIcon?.click();
    await page.click('text="Add Hydrophobic Coating"');
    await page.click('text="Continue"');

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Add - PopUp',
    });
    expect(event).toStrictEqual(expectedEvent);
  });

  test('Super Hydrophobic - Remove with Popup', async ({
    page,
  }) => {
    const dataLayer = new DataLayer(page);

    const expectedEvent = {
      event: 'PDPInteraction',
      eventCategory: 'PDP - D',
      eventAction: 'Sun Lens Funnel - Step 4: Coating',
      eventLabel: 'Super Hydrophobic - Remove - PopUp',
    };

    await page.goto('/');
    await page.click('text="Sunglasses"');
    await page.waitForTimeout(10000);
    const glasses = await page.$(
      "//img[@alt='Ray-Ban RB2132 New Wayfarer '][1]"
    );
    glasses?.click();
    await page.waitForTimeout(10000);
    await page.click('text="Select Lenses"');
    await page.waitForTimeout(5000);
    await page.click('text="Non-prescription"');
    await page.waitForTimeout(5000);
    await page.click('text="Continue"');
    await page.click('text="Continue"');
    await page.getByRole('checkbox').setChecked(true);
    await page.click('text="Continue"');
    await page.click('text="Back"');
    const helpIcon = await page.$(
      "//div[@role='presentation']/button/span[@data-test-name='questionMark']"
    );
    helpIcon?.click();
    await page.click('text="Added"');
    await page.click('text="Continue"');

    const [event] = await dataLayer.waitForDataLayer({
      event: 'PDPInteraction',
      eventLabel: 'Super Hydrophobic - Remove - PopUp',
    });
    expect(event).toStrictEqual(expectedEvent);
  });
});
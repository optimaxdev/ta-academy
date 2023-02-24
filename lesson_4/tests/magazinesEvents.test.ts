import { expect, test } from '@Test';
import { forEachSeries } from 'p-iteration';

test.describe('catch Magazines events', () => {
  const expectedEvent = {
    event: 'HPInteraction',
    eventAction: 'Magazines',
    eventCategory: 'HP - D',
  };

  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.FeatureIn.scrollTo();
  });

  test('check quantity and catch Magazines events', async ({ homePage, dataLayer }) => {
    const verifyEvent = dataLayer.createEventVerifier(expectedEvent);
    await verifyEvent('Visible');

    const magazines = await homePage.FeatureIn.getMagazines();
    expect(magazines.length).toBe(7);

    await forEachSeries(magazines, async (magazine) => {
      await dataLayer.clearDataLayer();
      await magazine.click();
      await verifyEvent('Click');
    });
  });
});

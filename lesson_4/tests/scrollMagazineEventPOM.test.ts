// import { HomePage } from '@Pages/homePage';
import { expect, test } from '@Test';

test.describe('scroll to magazines and check event', () => {
    const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Visible',
    };
    test('comparison the expected event with event in app', async ({ homePage, dataLayer }) => {
        await homePage.open();
        await homePage.FeatureIn.scrollTo();

        const [event] = await dataLayer.waitForDataLayer(expectedEvent);

        expect(event).toStrictEqual(expectedEvent);
    });

    test('magazines count is 7', async ({ homePage, dataLayer }) => {
        await homePage.open();
    });
});

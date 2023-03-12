import { expect, test } from '@Test';

test.describe('check event in dataLayer', () => {
    const expectedEvent = {
        event: 'GeneralNonInteraction',
        eventAction: '20% Visible',
        eventCategory: 'Footer - D',
        eventLabel: '',
    };

    test('check event in dataLayer 20% visibility', async ({ homePage, dataLayer }) => {
        await homePage.open();
        await homePage.Footer.scrollTo();

        const [event] = await dataLayer.waitForDataLayer({
            event: 'GeneralNonInteraction',
            eventAction: '20% Visible',
        });

        expect(event).toStrictEqual(expectedEvent);
    });
});

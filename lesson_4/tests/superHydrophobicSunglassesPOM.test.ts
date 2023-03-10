import { expect, test } from '@Test';

test.describe('superHydrophobicSungasses', () => {
    const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Visible',
    };

    test('test', async ({ homePage }) => {
        await homePage.open();
        await homePage.NavMenu.clickContacts();
    });
});

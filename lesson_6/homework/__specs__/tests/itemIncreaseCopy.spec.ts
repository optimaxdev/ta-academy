import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('form interaction', () => {
    const cartPage = new CartPageContainer();

    test('check for popup appearing', async () => {
        await cartPage.fulfill();
        await cartPage.addCartItem();
    });
});

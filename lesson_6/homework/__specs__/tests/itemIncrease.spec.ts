import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Item decrease & increase on cart page', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Analytics on cart page decrease & increase', async () => {
        // Добавляем мок для запроса на товары в корзине
        mock.addMocks(new GetCartItemsMock());

        // Рендерим страничку
        await cartPage.fulfill();

        // Получаем компонент со всеми товарами в корзина
        const cartList = await cartPage.getCartList();

        // Получаем первый товар из листа
        const [firstItem] = await cartList.getCartItems();

        // Получаем его количество перед нажатием кнопки "+"
        const itemQuantityBeforeAdding = await firstItem.getItemQuantity();
        // Нажимаем кнопку "+"
        await firstItem.add();

        // Получаем его количество после нажатия кнопки "+"
        const itemQuantityAfterAdding = await firstItem.getItemQuantity();

        reporter.startStep('Check increase event');
        // Находим евент с именем "IncrementQuantity"
        const increaseEvent = window.dataLayer.find(e => e.name === 'IncrementQuantity');
        // Сравниваем его с снапшотом (для записи снапшота запускаем тест с флагом "-u")
        expect(increaseEvent).toMatchObject({
            name: 'IncrementQuantity',
            value: `Item One - Increased: ${itemQuantityAfterAdding}`,
        });
        reporter.endStep();

        // Проверяем количество товара
        expect(itemQuantityBeforeAdding + 1).toBe(itemQuantityAfterAdding);
    });
});

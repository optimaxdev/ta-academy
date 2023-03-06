import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Create item on cart page ', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Checking the activation of an events with the addition of an item', async () => {
        // Добавляем мок для запроса на товары в корзине
        mock.addMocks(new GetCartItemsMock());

        // Рендерим страничку
        await cartPage.fulfill();

        // Нажимаем на кнопку Add Cart Item
        await cartPage.addCartItemClick();

        // Проверяем событие открытия
        reporter.startStep('Check form open event');
        // Находим евент с именем "FormInteraction"
        const formOpenEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(formOpenEvent).toMatchObject({
            name: 'FormInteraction',
            value: `Open`,
        });
        reporter.endStep();

        // Очищаем дата лэйер
        window.dataLayer = [];

        // Получаем модальное окно
        const modal = await cartPage.getAddItemPopup();

        // Заполняем поля формы
        await modal.fillFieldsForm();

        // Нажимаем на кнопку Создать
        await modal.clickCreateButton();

        // Проверяем событие закрытия
        reporter.startStep('Check form close event');
        // Находим евент с именем "FormInteraction"
        const formCloseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(formCloseEvent).toMatchObject({
            name: 'FormInteraction',
            value: `Close`,
        });
        reporter.endStep();

        // Очищаем дата лэйер
        window.dataLayer = [];
    });

    test('Checking event activation without adding an item', async () => {
        // Добавляем мок для запроса на товары в корзине
        mock.addMocks(new GetCartItemsMock());

        // Рендерим страничку
        await cartPage.fulfill();

        // Нажимаем на кнопку Add Cart Item
        await cartPage.addCartItemClick();

        // Проверяем событие открытия
        reporter.startStep('Check form open event');
        // Находим евент с именем "FormInteraction"
        const formOpenEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(formOpenEvent).toMatchObject({
            name: 'FormInteraction',
            value: `Open`,
        });
        reporter.endStep();

        // Очищаем дата лэйер
        window.dataLayer = [];

        // Получаем модальное окно
        const modal = await cartPage.getAddItemPopup();

        // Нажимаем на кнопку Закрыть
        await modal.clickCloseButton();

        // Проверяем событие закрытия
        reporter.startStep('Check form close event');
        // Находим евент с именем "FormInteraction"
        const formCloseEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        expect(formCloseEvent).toMatchObject({
            name: 'FormInteraction',
            value: `Close`,
        });
        reporter.endStep();

        // Очищаем дата лэйер
        window.dataLayer = [];
    });
});

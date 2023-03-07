import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';

describe('Create new cart item', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();

    test('Check event by click "Add Cart Item"', async () => {
        // Добавляем мок для запроса на товары в корзине
        mock.addMocks(new GetCartItemsMock());

        // Рендерим страничку
        await cartPage.fulfill();
        // кликаем добавить новую позицию
        await cartPage.addNewItemClick();
        // проверяем событие после открытия попапа
        reporter.startStep('Check event after openning popup');
        //находим событие с опреденным именем
        const openPopupEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        // проверяем ожидаемый результат
        expect(openPopupEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        //очищаем даталейер
        window.dataLayer = [];
        reporter.endStep();

        // получаем компонент попапа
        const popupForm = await cartPage.getNewItemPopup();
        // заполняем поля формы
        await popupForm.fillForm();
        // нажимаем кнопку созадть
        await popupForm.createButtonClick();

        reporter.startStep('Check event after clicking create');
        // находим ивент с опреденным именем
        const closePopupEvent = window.dataLayer.find(e => e.name === 'FormInteraction');
        // проверяем ожидаемый результат
        expect(closePopupEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        //очищаем даталейер
        window.dataLayer = [];
        reporter.endStep();

        // кликаем добавить новую позицию
        await cartPage.addNewItemClick();

        reporter.startStep('Check event after clicking "Add Item" button');
        // проверяем ожидаемый результат, событие open отработало
        expect(openPopupEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Open',
        });
        //очищаем даталейер
        window.dataLayer = [];
        reporter.endStep();

        // нажимаем кноаку закрыть
        await popupForm.closeButtonClick();

        reporter.startStep('Check event after clicking close');
        // проверяем ожидаемый результат, событие close отработало
        expect(closePopupEvent).toMatchObject({
            name: 'FormInteraction',
            value: 'Close',
        });
        //очищаем даталейер
        window.dataLayer = [];
        reporter.endStep();
    });
});

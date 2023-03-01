import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account and edit profile information', () => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };

    test('create new account via tooltip and go to profile page', async ({
        homePage,
        profilePage,
    }) => {
        await homePage.open();
        const header = homePage.Header;
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;
        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);

        await header.clickMyAccount();

        // проверяем имя под аватором
        expect(await profilePage.getNameFromAccountTitle()).toBe(accountData.firstName);

        // проверяем информацию в блоке My Details
        expect(await profilePage.getFirstNameFromMyDetails()).toBe(accountData.firstName);
        expect(await profilePage.getLastNameFromMyDetails()).toBe(accountData.lastName);
        expect(await profilePage.getEmailFromMyDetails()).toBe(email);

        // нажимаем на кнопку Edit Information
        await profilePage.editInformationClick();

        // изменяем имя и фамилию
        await profilePage.changeFirstName();
        await profilePage.changeLastName();

        // сохраняем изменения
        await profilePage.saveClick();
        await profilePage.closeClick();

        // проверяем внесененные изменения
        expect(await profilePage.getFirstNameFromMyDetails()).toBe('Andrey');
        expect(await profilePage.getLastNameFromMyDetails()).toBe('Odegov');
    });
});

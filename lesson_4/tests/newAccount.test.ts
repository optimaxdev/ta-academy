import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account', () => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };
    const modifiedData = {
        firstName: 'Julia',
        lastName: 'Shomina',
    };

    test('create new account via tooltip', async ({ homePage, myAccountPage }) => {
        await homePage.open();
        const header = homePage.Header;
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;
        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);

        await header.goToMyAccount();
        await header.clickToMyAccount();

        expect(await myAccountPage.AccountComponent.getNameUnderPhoto()).toBe(
            accountData.firstName
        );

        expect(await myAccountPage.AccountComponent.getNameFromMyDetails()).toBe(
            accountData.firstName
        );

        expect(await myAccountPage.AccountComponent.getSurnameFromMyDetails()).toBe(
            accountData.lastName
        );

        expect(await myAccountPage.AccountComponent.getEmailFromMyDetails()).toBe(email);

        await myAccountPage.AccountComponent.clickEditInfo();

        await myAccountPage.AccountComponent.changeName();

        await myAccountPage.AccountComponent.changeLastname();

        await myAccountPage.AccountComponent.clickSaveInfo();

        await myAccountPage.AccountComponent.clickCloseButton();

        expect(await myAccountPage.AccountComponent.getNameUnderPhoto()).toBe(
            modifiedData.firstName
        );

        expect(await myAccountPage.AccountComponent.getNameFromMyDetails()).toBe(
            modifiedData.firstName
        );

        expect(await myAccountPage.AccountComponent.getSurnameFromMyDetails()).toBe(
            modifiedData.lastName
        );
    });
});

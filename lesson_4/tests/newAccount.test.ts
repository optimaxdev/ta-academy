import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account', async () => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };

    const myData = {
        firstName: 'Alexandra',
        lastName: 'Shmoylova',
    };

    test('create new account via tooltip and check profile info', async ({
        homePage,
        accountPage,
    }) => {
        await homePage.open();
        const header = homePage.Header;
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;
        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);

        await header.clickWellcome();

        await header.clickMyAccount();

        const profile = accountPage.ProfileDetails;
        expect(await profile.getProfileName()).toBe(accountData.firstName);

        const accountDetails = accountPage.AccountDetails;
        expect(await accountDetails.getFirstName()).toBe(accountData.firstName);

        expect(await accountDetails.getLasttName()).toBe(accountData.lastName);
        expect(await accountDetails.getEmail()).toBe(email);

        await accountDetails.clickChangeInfo();
        await accountDetails.changeFirstName(myData.firstName);
        await accountDetails.changeLastName(myData.lastName);
        await accountDetails.clickSaveButton();
        await accountDetails.clickCloseButton();

        expect(await accountDetails.getFirstName()).toBe(myData.firstName);
        expect(await accountDetails.getLasttName()).toBe(myData.lastName);
    });
});

import { expect, test } from '@Test';

test.describe('create new account and edit profile information', () => {
    const email = '12453asdss@asd.ru';
    const accountData = {
        firstName: 'aabbbccfg',
        lastName: 'ddeefg',
        password: 'Passwaadd123445566',
    };
    const myData = {
        firstName: 'Marina',
        lastName: 'Lapardina',
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

        const profile = profilePage.Profile;

        const accountDetails = profilePage.AccountDetails;

        expect(await profile.getNameFromProfileTitle()).toBe(accountData.firstName);
        expect(await accountDetails.getFirstNameFromMyDetails()).toBe(accountData.firstName);
        expect(await accountDetails.getLastNameFromMyDetails()).toBe(accountData.lastName);
        expect(await accountDetails.getEmailFromMyDetails()).toBe(email);

        await accountDetails.editInformationClick();
        await accountDetails.changeFirstName(myData.firstName);
        await accountDetails.changeLastName(myData.lastName);
        await accountDetails.saveClick();
        await accountDetails.closeClick();
        expect(await accountDetails.getFirstNameFromMyDetails()).toBe(myData.firstName);
        expect(await accountDetails.getLastNameFromMyDetails()).toBe(myData.lastName);
    });
});

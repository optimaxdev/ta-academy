import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account', () => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };

    test('create new account via tooltip, check the entered data and the possibility of changing them', async ({ homePage, myAccountPage }) => {
        await homePage.open();
        const header = homePage.Header;
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;
        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);

        await header.openMyAccountPage();
        const myDetails = myAccountPage.MyDetails;

        expect(await myAccountPage.Profile.getUserName()).toBe(accountData.firstName);
        expect(await myDetails.getUserDetail('First Name')).toBe(accountData.firstName);
        expect(await myDetails.getUserDetail('Last Name')).toBe(accountData.lastName);
        expect(await myDetails.getUserDetail('Email Address')).toBe(email);

        await myDetails.openEditInformation();
        const editMyDetails = myAccountPage.EditMyDetails;
        const newFirstName: string = 'Anna';
        const newLastName: string = 'Razina';
        await editMyDetails.editUserDetails('First Name', newFirstName);
        await editMyDetails.editUserDetails('Last Name', newLastName);
        await editMyDetails.clickButton('Save');
        await editMyDetails.clickButton('Close');

        expect(await myDetails.getUserDetail('First Name')).toBe(newFirstName);
        expect(await myDetails.getUserDetail('Last Name')).toBe(newLastName);
    });
});

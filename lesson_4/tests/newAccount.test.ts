import { expect, test } from '@Test';
import faker from 'faker';

test.describe.configure({ mode: 'serial' });

test('create new account', async ({ homePage, accountPage }) => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };

    const newAccountData = {
        firstName: 'Mikhail',
        lastName: 'Lebedev',
    };

    const header = homePage.Header;
    const registerForm = homePage.RegisterForm;
    const myDetails = accountPage.MyDetails;
    const changAccountDetails = accountPage.ChangAccountDetails;

    await test.step('create new account via tooltip', async () => {
        await homePage.open();
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);
    });

    await test.step('check the correctness of the data', async () => {
        await header.openMyAccount();

        expect(await accountPage.Profile.getUserName()).toBe(accountData.firstName);
        expect(await myDetails.getUserFirstName()).toBe(accountData.firstName);
        expect(await myDetails.getUserLastName()).toBe(accountData.lastName);
        expect(await myDetails.getUserEmail()).toBe(email);
    });

    await test.step('change the data and check it for correctness', async () => {
        await myDetails.editInformation();
        await changAccountDetails.fill();

        expect(await accountPage.Profile.getUserName()).toBe(newAccountData.firstName);
        expect(await myDetails.getUserFirstName()).toBe(newAccountData.firstName);
        expect(await myDetails.getUserLastName()).toBe(newAccountData.lastName);
    });
});

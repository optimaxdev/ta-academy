import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account', () => {
    test('create new account, change data and check data', async ({ homePage, myAccountPage }) => {
        await homePage.open();

        const header = homePage.Header;
        const myAccountSideBar = myAccountPage.myAccountSideBar;
        const myAccountContent = myAccountPage.myAccountContent;

        const email = faker.internet.email();
        const accountData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.internet.password(),
        };

        await test.step('create new account via tooltip', async () => {
            await header.clickAccountTooltip();
            await header.clickCreateAccount();

            const registerForm = homePage.RegisterForm;
            await registerForm.fill({ email });
            await registerForm.fill(accountData);

            expect(await header.getUserName()).toBe(accountData.firstName);
        });

        await test.step('check registration data', async () => {
            await header.clickWelcome();
            await header.clickMyAccount();

            expect(await myAccountSideBar.getUserName()).toBe(accountData.firstName);

            await myAccountSideBar.menuButtonClick('myDetails');

            const expextedAccountData = {
                firstName: accountData.firstName,
                lastName: accountData.lastName,
                email,
            };

            expect(expextedAccountData).toEqual(await myAccountContent.getRegistrationData());
        });

        await test.step('change registration data and check result', async () => {});
        await myAccountContent.buttonEditInformationClick();

        const changedAccountData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: email,
        };

        await myAccountContent.fillFormMyDetails(changedAccountData);
        await myAccountContent.buttonSaveChangesClick();
        await myAccountContent.buttonCloseChangesClick();

        expect(changedAccountData).toEqual(await myAccountContent.getRegistrationData());
    });
});

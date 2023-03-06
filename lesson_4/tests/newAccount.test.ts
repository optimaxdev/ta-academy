import { expect, test } from '@Test';
import faker from 'faker';

test.describe('create new account', () => {
    const email = faker.internet.email();
    const accountData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: 'Password123',
    };

    test('create new account via tooltip and validation of registration data', async ({ homePage, accountPage }) => {
        await homePage.open();
        const header = homePage.Header;

        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;

        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);
        
        await header.clickRegisteredAccountTooltip();
        await header.clickMyAccount();

        const myDetails = accountPage.MyDetails;

        expect(await accountPage.Profile.getProfileName()).toBe(accountData.firstName);
        expect(await myDetails.getFirstName()).toBe(accountData.firstName);
        expect(await myDetails.getLastName()).toBe(accountData.lastName);
        expect(await myDetails.getEmail()).toBe(email);
        
        await myDetails.clickEditInformation();
        await myDetails.changeFirstName('Denis');
        await myDetails.changeLastName('Fomin');
        await myDetails.clickSaveChangedInfo();
        await myDetails.clickCloseEdit();
        
        expect(await myDetails.getFirstName()).toBe('Denis');
        expect(await myDetails.getLastName()).toBe('Fomin');
    });
});
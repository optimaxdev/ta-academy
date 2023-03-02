import { expect, test } from '@Test';

function randomTokenName(): string {
  const generate = () =>
    Math.random()
      .toString(36)
      .substring(2, 15);
  return generate() + generate();
}

test.describe('create new account', () => {
    const email = randomTokenName()+"@mail.ru";
    const accountData = {
        firstName: randomTokenName(),
        lastName: randomTokenName(),
        password: 'Password123',
    };

    test.afterAll(async ({ page }) => {
        await page.close();
    })

    test('create new account via tooltip', async ({ homePage, myAccount }) => {
        await homePage.open();
        const header = homePage.Header;
        await header.clickAccountTooltip();
        await header.clickCreateAccount();

        const registerForm = homePage.RegisterForm;
        await registerForm.fill({ email });
        await registerForm.fill(accountData);

        expect(await header.getUserName()).toBe(accountData.firstName);

        await header.goToMyAccount();
        await myAccount.clickMyDetails();
        const myDetailsSection = myAccount.myDetailsSection;

        expect(await myDetailsSection.getFirstName()).toBe(accountData.firstName);
        expect(await myDetailsSection.getLastName()).toBe(accountData.lastName);
        expect(await myDetailsSection.getEmail()).toBe(email);

        await myDetailsSection.editLinkClick();

        const changedAccountData = {
            firstName: "Matvey",
            lastName: "Krasilnikov",
        };

        await myDetailsSection.fillFormMyDetails(changedAccountData);
        await myDetailsSection.saveButtonClick();

        expect(await myDetailsSection.getFirstName()).toBe(changedAccountData.firstName);
        expect(await myDetailsSection.getLastName()).toBe(changedAccountData.lastName);
    });
});

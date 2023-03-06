import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { MyAccount } from '@Pages/myAccount';

type Options = {
    dataLayer: DataLayer;
    homePage: HomePage;
    categoryPage: CategoryPage;
    myAccount: MyAccount;
};

const test = base.extend<Options>({
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
    myAccount: async ({ page }, use) => {
        await use(new MyAccount(page));
    },    
});

export { test, expect };

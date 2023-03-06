import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { ProfilePage } from '@Pages/ProfilePage';

type Options = {
    dataLayer: DataLayer;
    homePage: HomePage;
    categoryPage: CategoryPage;
    profilePage: ProfilePage;
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
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page));
    },
});

export { test, expect };

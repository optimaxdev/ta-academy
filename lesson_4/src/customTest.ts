import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { ProductPage } from './pages/productPage';

type Options = {
    dataLayer: DataLayer;
    homePage: HomePage;
    categoryPage: CategoryPage;
    productPage: ProductPage;
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
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
});

export { test, expect };

import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { ProductGlassesPage } from '@Pages/productGlassesPage';
import { ChooseLensesPage } from '@Pages/chooseLensesPage';

type Options = {
    dataLayer: DataLayer;
    homePage: HomePage;
    categoryPage: CategoryPage;
    productGlassesPage: ProductGlassesPage;
    chooseLensesPage: ChooseLensesPage;
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
    productGlassesPage: async ({ page }, use) => {
        await use(new ProductGlassesPage(page));
    },
    chooseLensesPage: async ({ page }, use) => {
        await use(new ChooseLensesPage(page));
    },
});

export { test, expect };

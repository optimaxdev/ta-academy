import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { HomePage } from '@Pages/homePage';
import { CategoryPage } from '@Pages/categoryPage';
import { SunglassesCatalogPage } from '@Pages/SunglassesCatalogPage';
import { SunglassesPage } from '@Pages/sunglassesPage';

type Options = {
    dataLayer: DataLayer;
    homePage: HomePage;
    categoryPage: CategoryPage;
    sunglassesCatalogPage: SunglassesCatalogPage;
    sunglassesPage: SunglassesPage;
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
    sunglassesCatalogPage: async ({ page }, use) => {
        await use(new SunglassesCatalogPage(page));
    },
    sunglassesPage: async ({ page }, use) => {
        await use(new SunglassesPage(page));
    },
});

export { test, expect };

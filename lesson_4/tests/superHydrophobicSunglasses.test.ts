import { Wizzard } from '@Components/wizzard';
import { CategoryPage } from '@Pages/categoryPage';
import { HomePage } from '@Pages/homePage';
import { ProductPage } from '@Pages/productPage';
import { test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.describe('PDPInteraction events', () => {
    let homePage: HomePage;
    let dataLayer: DataLayer;
    let categoryPage: CategoryPage;
    let productPage: ProductPage;
    let wizzardBox: Wizzard;
    const expectedEvent = {
        event: 'PDPInteraction',
        eventAction: 'Sun Lens Funnel - Step 4: Coating',
        eventCategory: 'PDP - D',
    };

    test.beforeEach(async ({ page }) => {
        dataLayer = new DataLayer(page);
        
        homePage = new HomePage(page);

        await homePage.open();
        const header = await homePage.Header;
        await header.clickSunglassesButton();

        categoryPage = new CategoryPage(page);
        categoryPage.openFirstProduct();

        //await page.waitForTimeout(5000);

        productPage = new ProductPage(page);
        const sidebar = productPage.SidebarBox;
        await sidebar.clickChooseLenses();
        wizzardBox = productPage.WizzardBox;
        
        wizzardBox.clickNonPrescription();
        wizzardBox.clickContinue();
        await page.waitForTimeout(2000);
        wizzardBox.clickContinue();
    });

    test.afterAll(async ({ page }) => {
        await page.close();
    })

    test('should fire after adding coating and removing it', async ({ page }) => {
        const verifyEvent = dataLayer.createEventVerifier(expectedEvent);

        wizzardBox = productPage.WizzardBox;
        await page.waitForTimeout(1000);
        wizzardBox.clickContinue();

        await verifyEvent('No Coating Added');

        await wizzardBox.clickBackToPrev();
        await wizzardBox.clickSuperHydrophobic();
        await wizzardBox.clickContinue();

        await verifyEvent('Super Hydrophobic - Add');

        await wizzardBox.clickBackToPrev();
        await wizzardBox.clickSuperHydrophobic();
        await wizzardBox.clickContinue();

        await verifyEvent('Super Hydrophobic - Remove');
    });

});

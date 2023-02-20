import { expect, test } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';

test.use({ viewport: { height: 1080, width: 1920 } });

test('quantity of clicks should be 7', async ({
    page,
  }) => {
    const addDataLayer = new DataLayer(page);  
    const expectedEvent = {
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click',
      };
    await page.goto('/') //starting a new page
    await page.waitForTimeout(5000);  //add some timer
    
    //search for forebs IMG
    const getForbes = await page.$(
        "//img[@alt='Forbes']"
      );
    
      //click on it
    await getForbes?.click();
    
    //searching for the event
    const [Forbes] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    //expect
    expect(Forbes).toStrictEqual(expectedEvent);

    //clear the datalayer object
    await page.evaluate(() => (window.dataLayer = []));
    
    const getCNN = await page.$(
        "//img[@alt='CNN']"
      );
    await getCNN?.click();
    const [CNN] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(CNN).toStrictEqual(expectedEvent);

    await page.evaluate(() => (window.dataLayer = []));
    
    const getElle = await page.$(
        "//img[@alt='Elle']"
      );
    await getElle?.click();
    const [Elle] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(Elle).toStrictEqual(expectedEvent);

    await page.evaluate(() => (window.dataLayer = []));
    
    const getEsquire = await page.$(
        "//img[@alt='Esquire']"
      );
    await getEsquire?.click();
    const [Esquire] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(Esquire).toStrictEqual(expectedEvent);

    await page.evaluate(() => (window.dataLayer = []));
    
    const getBusiness_Insider = await page.$(
        "//img[@alt='Business Insider']"
      );
    await getBusiness_Insider?.click();
    const [Business_Insider] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(Business_Insider).toStrictEqual(expectedEvent);

    await page.evaluate(() => (window.dataLayer = []));
    
    const getCosmopolitan = await page.$(
        "//img[@alt='Cosmopolitan']"
      );
    await getCosmopolitan?.click();
    const [Cosmopolitan] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(Cosmopolitan).toStrictEqual(expectedEvent);

    await page.evaluate(() => (window.dataLayer = []));
    
    const getIn_Style = await page.$(
        "//img[@alt='In Style']"
      );
    await getIn_Style?.click();
    const [In_Style] = await addDataLayer.waitForDataLayer({
        event: 'HPInteraction',
        eventAction: 'Magazines',
        eventCategory: 'HP - D',
        eventLabel: 'Click'
    });
    expect(In_Style).toStrictEqual(expectedEvent);
  });










test('check event in dataLayer magazine visible', async ({
  page,
}) => {
  const dataLayer = new DataLayer(page);

  const expectedEvent = {
    "event": "HPInteraction",
   "eventAction": "Magazines",
   "eventCategory": "HP - D",
   "eventLabel": "Visible",
  };

  await page.goto('/');
  await page.waitForTimeout(5000);

  await page.mouse.wheel(0, 4500);
  const [event] = await dataLayer.waitForDataLayer({
    event: 'HPInteraction',
    eventAction: 'Magazines',
    eventCategory: 'HP - D',
    eventLabel: 'Visible'
  });
  
  expect(event).toStrictEqual(expectedEvent);
});












  test('quantity of magazines should be 7', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForTimeout(5000);

    const magazinesQuantity = await page.$$(
      '[class="homeAsFeaturedIn__listItem___2cWZJ"]'
    );
    const qty = magazinesQuantity.length;
    console.log(magazinesQuantity);
    expect(qty).toBe(7);
  });


 
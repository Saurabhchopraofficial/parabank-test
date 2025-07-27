const {chromium} = require('playwright');

( async () => {

    const browser = await chromium.launch({ headless: false, slowMo: 200 });
    const page = await browser.newPage();

    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', async dailog => {
        console.log(dailog.message());
        await dailog.accept();
    });
    await page.click('#confirmButton');

    await page.click('#promtButton');

    await browser.close();

    // npx playwright codegen screener.in 

}) ();
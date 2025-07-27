const {chromium} = require('playwright');

( async () => {

    const browser = await chromium.launch({ headless: false, slowMo: 300 });
    const page = await browser.newPage();

    await page.goto('https://the-internet.herokuapp.com/dropdown');

    const dropdown = await page.$('#dropdown');
    //Dropdown by value
    await dropdown.selectOption({ value: '1' })
    //Dropdown by label
    await dropdown.selectOption({ label: 'Option 2' })
    //Dropdown by index
    await dropdown.selectOption({ index: 1 })
    //Values inside this select
    const availableOptions = await dropdown.$$('option');
    for (let i =0; i < availableOptions.length; i++) {
        console.log(await availableOptions[i].innerText());
    }
    await browser.close();


}) ();
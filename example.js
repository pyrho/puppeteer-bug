const puppeteer = require('puppeteer');

(async () => {
    const pathToExtension = require('path').join(__dirname, 'extension');
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`
        ]
    });
    const targets = await browser.targets();
    const backgroundPageTarget = targets.find(target => {
        return target.type() === 'background_page';
    });
    const backgroundPage = await backgroundPageTarget.page();
    backgroundPage.on('error', msg => console.log(`bg: ${msg.text()}`));
    backgroundPage.on('console', msg => console.log(`bg: ${msg.text()}`));

    console.log('Opening tab');
    const page = await browser.newPage();
    page.on('console', msg => console.log(`web: ${msg.text()}`));
    console.log('Navigate');
    await page.goto('https://example.com');
    console.log('Test');
    console.log('closing');
    // await browser.close();
})();

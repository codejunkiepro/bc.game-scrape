const puppeteer = require("puppeteer-extra");
const path = require("path");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { timeout } = require("puppeteer");
puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // executablePath: path.join(__dirname, "./chrome-win64/chrome.exe"),
        userDataDir: path.join(__dirname, "./chrome/userdata"),
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Add these flags to run as root
        // args: [
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        //     '--disable-web-security',  // Disables web security to handle CORS issues
        //     '--disable-features=IsolateOrigins,site-per-process',  // Enable cross-origin features
        //     // '--disable-features=IsolateOrigins,site-per-process',
        //     '--disable-blink-features=AutomationControlled',
        // ]
    });
    const page = await browser.newPage();
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');
    // await page.setViewport({ width: 1330, height: 1024 });
    // Navigate the page to a URL.
    await page.goto("https://bc.game/game/crash", { timeout: 60000 });
    // await page.wait
    // Wait for some selector to be visible (optional)
    await page.waitForSelector(".scroll-x.tabs-title button.tabs-btn", {
        timeout: 60000,
    });
    console.log("find a button")
    // Inject your JavaScript code
    await page.evaluate(() => {
        // This code runs in the page context
        console.log('JavaScript code has been injected!');
        document.querySelectorAll('.scroll-x.tabs-title button.tabs-btn')[1].click()
        setInterval(() => {
            let hash = document.querySelector('table.caption-bottom tbody tr td:nth-child(3)').innerText;
            console.log(hash);
            let url = `https://staging.islandapps.co/add/hash?hash=${hash}&odds=`

            // fetch(url, {mode: 'no-cors', method: 'GET'}).then((data) => {
            fetch(url)
                .then((data) => {
                    data.text().then((hash) => {
                        if (hash) {

                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000)
    });
})();

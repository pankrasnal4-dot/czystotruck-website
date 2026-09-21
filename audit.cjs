const { chromium } = require('./node_modules/playwright');

async function testUrl(browser, url, label) {
  console.log(`\n========================================`);
  console.log(`AUDYT: ${label}`);
  console.log(`URL: ${url}`);
  console.log(`========================================`);

  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('pageerror', err => {
    pageErrors.push(err.toString());
  });

  page.on('requestfailed', req => {
    networkErrors.push({ url: req.url(), error: req.failure() ? req.failure().errorText : 'unknown' });
  });

  try {
    await page.goto(url, { waitUntil: 'load', timeout: 8000 }).catch(e => {
      console.log(`info: ${e.message}`);
    });

    await page.waitForTimeout(2000);

    const title = await page.title();
    const bodyLength = await page.evaluate(() => document.body ? document.body.innerText.trim().length : 0);
    const bodySnippet = await page.evaluate(() => document.body ? document.body.innerText.slice(0, 100).replace(/\n/g, ' ') : '');
    const hasRootContent = await page.evaluate(() => {
      const el = document.getElementById('root');
      return el ? el.children.length : -1;
    });

    console.log(`Tytuł: "${title}"`);
    console.log(`Tekst na stronie (długość): ${bodyLength} znaków`);
    console.log(`Podgląd treści: "${bodySnippet}..."`);
    console.log(`Liczba elementów w #root: ${hasRootContent}`);

    console.log(`PageErrors: ${pageErrors.length}`);
    if (pageErrors.length > 0) console.error('BŁĘDY CRASHU:', pageErrors);

    console.log(`ConsoleErrors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) console.error('BŁĘDY KONSOLI:', consoleErrors);

    console.log(`NetworkErrors: ${networkErrors.length}`);
    if (networkErrors.length > 0) console.error('BŁĘDY SIECI:', networkErrors);

    const isSuccess = bodyLength > 500 && pageErrors.length === 0;
    console.log(`STATUS: ${isSuccess ? '✅ SUKCES (STRONA DZIAŁA POPRAWNIE)' : '❌ BŁĄD'}`);

  } finally {
    await page.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    await testUrl(browser, 'http://localhost:3000', '1. Serwer lokalny dev (http://localhost:3000)');
    await testUrl(browser, 'file:///D:/antigravity/work%20website/index.html', '2. Otwarcie index.html bezpośrednio z dysku');
    await testUrl(browser, 'file:///D:/antigravity/work%20website/CzystoTruck-Strona.html', '3. Samodzielny plik CzystoTruck-Strona.html');
  } finally {
    await browser.close();
  }
}

main();

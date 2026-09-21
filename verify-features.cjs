const { chromium } = require('./node_modules/playwright');
const path = require('path');

async function runFeatureVerification() {
  console.log('--- STARTING FEATURE VERIFICATION ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(`[PageError] ${err.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[ConsoleError] ${msg.text()}`);
  });

  try {
    // 1. Visit homepage and wait for preloader to finish (~3.2s)
    console.log('1. Loading http://localhost:3000/...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(3500);

    // Accept cookies to clear view
    const cookieBtn = page.locator('button:has-text("AKCEPTUJĘ")').first();
    if (await cookieBtn.isVisible()) {
      await cookieBtn.click();
      await page.waitForTimeout(300);
    }

    // Verify Title & Hero
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Verify Hero elements
    const heroTitle = await page.locator('h1').innerText();
    console.log(`Hero H1:\n${heroTitle}`);

    // Verify phone links
    const phoneLinks = await page.locator('a[href^="tel:"]').all();
    console.log(`Found ${phoneLinks.length} clickable tel: links on page`);
    for (const link of phoneLinks) {
      const href = await link.getAttribute('href');
      if (!href.includes('514690066')) {
        throw new Error(`Invalid phone link href: ${href}`);
      }
    }
    console.log('All phone links are active and point to +48514690066');

    // Screenshot homepage
    const homeScreenshotPath = path.join(__dirname, 'screenshot-home.png');
    await page.screenshot({ path: homeScreenshotPath, fullPage: false });
    console.log(`Saved screenshot: ${homeScreenshotPath}`);

    // 2. Click "Darmowa Wycena Online" in Hero
    console.log('2. Clicking "Darmowa Wycena Online" button in Hero...');
    const quoteBtn = page.locator('button:has-text("Darmowa Wycena Online")').first();
    await quoteBtn.click();
    await page.waitForTimeout(1000);

    // Verify /wycena route
    const currentUrl = page.url();
    console.log(`Current URL after navigation: ${currentUrl}`);
    const isWycenaVisible = await page.locator('h1:has-text("WYCENA ODBIORU")').count();
    console.log(`Wycena heading count: ${isWycenaVisible}`);
    if (isWycenaVisible === 0) {
      throw new Error('Quote page heading "WYCENA ODBIORU" not found after clicking CTA!');
    }

    // Screenshot Step 1
    const quoteStep1Path = path.join(__dirname, 'screenshot-quote-step1.png');
    await page.screenshot({ path: quoteStep1Path, fullPage: false });
    console.log(`Saved screenshot: ${quoteStep1Path}`);

    // Interact with Step 1
    console.log('3. Interacting with Step 1 (Categories & description)...');
    const catMieszkanie = page.locator('button:has-text("Całe Mieszkanie")').first();
    await catMieszkanie.click();
    await page.locator('textarea').fill('Mieszkanie 45m2 po poprzednich lokatorach, do zabrania meble pokojowe i kuchenne.');

    // Next to Step 2
    console.log('4. Navigating to Step 2 (Location & floor conditions)...');
    await page.locator('button:has-text("Dalej: Warunki i Adres")').click();
    await page.waitForTimeout(500);

    // Interact with Step 2
    const step2Title = await page.locator('h2:has-text("Gdzie i w jakich warunkach")').innerText();
    console.log(`Step 2 title: ${step2Title}`);
    await page.locator('select').first().selectOption('Widzew');
    await page.locator('input[placeholder*="Piotrkowska"]').fill('ul. Zakładowa 42');

    // Next to Step 3
    console.log('5. Navigating to Step 3 (Contact & date)...');
    await page.locator('button:has-text("Dalej: Kontakt i Termin")').click();
    await page.waitForTimeout(500);

    // Interact with Step 3
    const step3Title = await page.locator('h2:has-text("Gdzie mamy zadzwonić")').innerText();
    console.log(`Step 3 title: ${step3Title}`);
    await page.locator('input[type="tel"]').fill('514 690 066');
    await page.locator('input[placeholder*="Michał"]').fill('Piotr Kowalczyk');

    // Screenshot Step 3
    const quoteStep3Path = path.join(__dirname, 'screenshot-quote-step3.png');
    await page.screenshot({ path: quoteStep3Path, fullPage: false });
    console.log(`Saved screenshot: ${quoteStep3Path}`);

    // Click back to home
    console.log('6. Clicking "Wróć do strony głównej"...');
    await page.locator('button:has-text("Wróć do strony głównej")').click();
    await page.waitForTimeout(1000);
    const backUrl = page.url();
    console.log(`Returned to URL: ${backUrl}`);

    // 7. Test mobile viewport
    console.log('7. Testing mobile viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(500);
    const mobileCallBar = await page.locator('text=Zadzwoń (+48 514 690 066)').isVisible();
    console.log(`Mobile call bar visible on mobile: ${mobileCallBar}`);

    // Mobile screenshot
    const mobileScreenshotPath = path.join(__dirname, 'screenshot-mobile.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`Saved screenshot: ${mobileScreenshotPath}`);

    console.log(`Errors encountered: ${errors.length}`);
    if (errors.length > 0) {
      console.error('Errors:', errors);
      process.exit(1);
    }

    console.log('--- ALL VERIFICATIONS PASSED WITH 0 ERRORS! ---');
  } finally {
    await browser.close();
  }
}

runFeatureVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

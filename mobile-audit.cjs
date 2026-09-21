const { chromium } = require('./node_modules/playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: 'iPhone_SE', width: 375, height: 667 },
  { name: 'iPhone_14', width: 390, height: 844 },
  { name: 'Android_Pixel', width: 412, height: 915 },
];

async function auditMobile() {
  console.log('=== STARTING DEEP MOBILE AUDIT ===');
  const browser = await chromium.launch({ headless: true });
  const results = {
    overflowIssues: [],
    consoleErrors: [],
    tapTargetIssues: [],
    stepFlowSuccess: false,
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });

      const page = await context.newPage();
      page.on('console', msg => {
        if (msg.type() === 'error') results.consoleErrors.push(`[${vp.name}] ${msg.text()}`);
      });

      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3500); // Wait for preloader to lift

      // Accept cookies
      const cookieBtn = page.locator('button:has-text("AKCEPTUJĘ")').first();
      if (await cookieBtn.isVisible()) {
        await cookieBtn.click();
        await page.waitForTimeout(300);
      }

      // Check horizontal overflow along the entire scroll height
      const overflowInfo = await page.evaluate(() => {
        const bodyWidth = document.body.offsetWidth;
        const windowWidth = window.innerWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const overflowingElements = [];

        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > windowWidth + 2) {
            overflowingElements.push({
              tag: el.tagName,
              id: el.id,
              className: el.className ? el.className.toString().slice(0, 50) : '',
              right: rect.right,
              width: rect.width,
            });
          }
        });

        return {
          windowWidth,
          scrollWidth,
          bodyWidth,
          hasOverflow: scrollWidth > windowWidth,
          overflowingElements: overflowingElements.slice(0, 10),
        };
      });

      console.log(`Horizontal overflow check: scrollWidth=${overflowInfo.scrollWidth}, innerWidth=${overflowInfo.windowWidth}`);
      if (overflowInfo.hasOverflow) {
        console.warn(`[WARNING] Horizontal overflow detected on ${vp.name}!`);
        console.warn(JSON.stringify(overflowInfo.overflowingElements, null, 2));
        results.overflowIssues.push({ viewport: vp.name, ...overflowInfo });
      } else {
        console.log(`✅ No horizontal overflow on ${vp.name}!`);
      }

      // Take screenshot of Hero on this mobile viewport
      const heroScreenshot = path.join(__dirname, `mobile-hero-${vp.name}.png`);
      await page.screenshot({ path: heroScreenshot, fullPage: false });
      console.log(`Saved screenshot: ${heroScreenshot}`);

      // Test mobile menu open & close
      console.log('Testing mobile menu toggle...');
      const menuBtn = page.locator('button[aria-label="Otwórz menu"]').first();
      await menuBtn.click();
      await page.waitForTimeout(600);

      const menuScreenshot = path.join(__dirname, `mobile-menu-${vp.name}.png`);
      await page.screenshot({ path: menuScreenshot, fullPage: false });
      console.log(`Saved menu screenshot: ${menuScreenshot}`);

      // Close menu
      const closeMenuBtn = page.locator('button[aria-label="Zamknij menu"]').first();
      await closeMenuBtn.click();
      await page.waitForTimeout(400);

      // Navigate to /wycena
      console.log('Testing /wycena subpage on mobile...');
      const quoteCta = page.locator('button:has-text("Darmowa Wycena Online")').first();
      await quoteCta.click();
      await page.waitForTimeout(1000);

      const quoteStep1Screenshot = path.join(__dirname, `mobile-wycena-step1-${vp.name}.png`);
      await page.screenshot({ path: quoteStep1Screenshot, fullPage: false });
      console.log(`Saved wycena step 1 screenshot: ${quoteStep1Screenshot}`);

      // Check overflow on /wycena
      const quoteOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      console.log(`Wycena horizontal overflow: ${quoteOverflow ? '❌ YES' : '✅ NONE'}`);

      // Test step progression on mobile
      await page.locator('button:has-text("Dalej: Warunki i Adres")').click();
      await page.waitForTimeout(500);

      const quoteStep2Screenshot = path.join(__dirname, `mobile-wycena-step2-${vp.name}.png`);
      await page.screenshot({ path: quoteStep2Screenshot, fullPage: false });
      console.log(`Saved wycena step 2 screenshot: ${quoteStep2Screenshot}`);

      await page.locator('button:has-text("Dalej: Kontakt i Termin")').click();
      await page.waitForTimeout(500);

      const quoteStep3Screenshot = path.join(__dirname, `mobile-wycena-step3-${vp.name}.png`);
      await page.screenshot({ path: quoteStep3Screenshot, fullPage: false });
      console.log(`Saved wycena step 3 screenshot: ${quoteStep3Screenshot}`);

      // Return home
      await page.locator('button:has-text("Wróć")').first().click();
      await page.waitForTimeout(600);

      await context.close();
    }

    console.log('\n=== MOBILE AUDIT SUMMARY ===');
    console.log(`Overflow issues detected: ${results.overflowIssues.length}`);
    console.log(`Console errors detected: ${results.consoleErrors.length}`);
    if (results.consoleErrors.length > 0) {
      console.error(results.consoleErrors);
    }
    console.log('============================\n');
  } finally {
    await browser.close();
  }
}

auditMobile().catch(err => {
  console.error('Mobile audit error:', err);
  process.exit(1);
});

const { chromium } = require('./node_modules/playwright');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // Wait for preloader curtain animation to complete
  
  await page.screenshot({ path: 'scratch-hero-verified.png', fullPage: false });
  console.log('Zrzut ekranu zapisany jako scratch-hero-verified.png');
  
  await browser.close();
}

capture();

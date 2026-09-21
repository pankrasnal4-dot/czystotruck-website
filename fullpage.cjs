const { chromium } = require('./node_modules/playwright');

async function captureFullPage() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  
  await page.screenshot({ path: 'scratch-fullpage.png', fullPage: true });
  console.log('Zrzut pełnej strony zapisany');
  
  await browser.close();
}

captureFullPage();

const { injectAxe, checkA11y } = require('axe-playwright');
const { chromium } = require('playwright-chromium');

const BASE_URL = 'http://localhost:3000';

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(BASE_URL);
});

afterEach(async () => {
  await page.close();
});

it('should work', async () => {
  expect(await page.title()).toBe('Joe Bateson');
});

it('should pass a11y audit', async () => {
  await injectAxe(page);
  await checkA11y(page);
});

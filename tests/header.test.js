const Page = require('./helpers/page');

let page;

beforeEach(async () => {
   page = await Page.build();
   await page.goto('http://127.0.0.1:3000');
});

afterEach(async () => {
   await page.close();
});

test('The header has the correct text', async () => {
   const text = await page.getContentsOf('h1.header__logo-text');

   expect(text).toEqual('Blogster');
});

test('Clicking login starts authentication flow', async () => {
   await page.click('#login-btn');
   const url = await page.url();

   expect(url).toMatch(/http:\/\/127\.0\.0\.1:3000\/login/);
});

test('When signed in, show logout button', async () => {
   await page.login();

   const text = await page.getContentsOf('#logout-btn');

   expect(text).toEqual('Log out');
});

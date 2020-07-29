const Page = require('./helpers/page');

let page;

beforeEach(async () => {
   page = await Page.build();
   await page.goto('http://127.0.0.1:3000');
});

afterEach(async () => {
   await page.close();
});

describe('When loggen in', async () => {
   beforeEach(async () => {
      await page.login();
      await page.click('button#fab');
   });

   test('can see blog create form', async () => {
      const label = await page.getContentsOf('form label');

      expect(label).toEqual('Blog title');
   });

   describe('And using valid inputs', async () => {
      beforeEach(async () => {
         await page.waitFor('input.form__input-text');
         await page.waitFor('textarea.form__input-textarea');
         await page.type('input.form__input-text', 'My Title');
         await page.type('textarea.form__input-textarea', 'My Content');
         // await page.click('button.btn__submit');
      });

      test('Submitting and saving adds a blog to the index page', async () => {
         await page.click('.btn__submit');
         await page.waitFor('.blog__container h2');
         await page.waitFor('.blog__container p');

         const title = await page.getContentsOf('.blog__container h2');
         const content = await page.getContentsOf('.blog__container p');

         expect(title).toEqual('My Title');
         expect(content).toEqual('My Content');
      });
   });

   // describe('And using invalid inputs', async () => {
   //    beforeEach(async () => {
   //       await page.click('button.btn__submit');
   //    })

   //    test('The form shows an error message', async () => {

   //    })
   // })
});

describe('User is not logged in', async () => {
   test('User cannot create blog post', async () => {
      const result = await page.evaluate(() => {
         return fetch('/api/v1/blogs', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               title: 'My Blog',
               content: 'My Another Content'
            })
         }).then(res => res.json());
      });

      expect(result.error).toEqual({
         statusCode: 401,
         status: 'fail',
         isOperational: true
      });
   });

   test('User cannot get a list of posts', async () => {
      const result = await page.evaluate(() => {
         return fetch('/api/v1/blogs', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(res => res.json());
      });

      expect(result.error).toEqual({
         statusCode: 401,
         status: 'fail',
         isOperational: true
      });
   });
});

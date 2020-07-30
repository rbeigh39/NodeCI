const puppeteer = require('puppeteer');
const tokenFactory = require('../factories/tokenFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
   static async build() {
      const browser = await puppeteer.launch({
         headless: true,
         args: ['--no-sandbox', '--window-size=1920,1080'],
         defaultViewport: null
      });

      const page = await browser.newPage();
      const customPage = new CustomPage(page);

      return new Proxy(customPage, {
         get: function(target, property) {
            return customPage[property] || browser[property] || page[property];
         }
      });
   }

   constructor(page) {
      this.page = page;
   }

   async login() {
      const user = await userFactory();
      const { token } = tokenFactory(user);

      await this.page.setCookie({
         name: 'jwt',
         value: token
      });

      await this.page.goto('http://127.0.0.1:3000/my-blogs');
   }

   async getContentsOf(selector) {
      return this.page.$eval(selector, el => el.innerHTML);
   }
}

module.exports = CustomPage;

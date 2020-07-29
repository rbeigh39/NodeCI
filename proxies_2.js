class Page {
   goto() {
      console.log('I am going to another page');
   }

   setCookie() {
      console.log('I am setting a cookie');
   }
}

class CustomPage {
   static build() {
      const page = new Page();
      const customPage = new CustomPage(page);

      const superPage = new Proxy(customPage, {
         get: function(target, property) {
            return customPage[property] || page[property];
         }
      });

      return superPage;
   }

   constructor(page) {
      this.page = page;
   }

   login() {
      this.page.goto('localhost:3000');
      this.page.setCookie();
   }
}

const superPage = CustomPage.build();

superPage.login();
superPage.goto();

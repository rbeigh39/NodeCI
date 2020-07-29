import axios from 'axios';
import { showAlert } from './alerts';

axios.defaults.withCredentials = true;

const blogContainer = document.getElementById('my-blogs-container');

const insertBlogs = arr => {
   arr.forEach(cur => {
      const markup = `<div class="blog__container"><h2 class="blog__heading u-margin-bottom-medium">${cur.title}</h2><p class="blog__content u-margin-bottom-medium">${cur.content}</p><a href="#" class="blog__link">Read</a></div>`;

      blogContainer.insertAdjacentHTML('beforeend', markup);
   });
};

export const myBlogs = async () => {
   blogContainer.innerHTML = '';

   try {
      const res = await axios({
         method: 'GET',
         url: `${window.url}/api/v1/blogs`
      });

      insertBlogs(res.data.data);
   } catch (err) {
      console.log(err);
   }
};

export const createNewBlog = async (title, content) => {
   try {
      const res = await axios({
         method: 'POST',
         url: `${window.url}/api/v1/blogs`,
         data: {
            title,
            content
         }
      });

      if (res.data.status === 'success') {
         console.log(res);
         showAlert('success', 'Blog successfully created');

         window.setTimeout(() => {
            location.assign(`${window.clientUrl}/my-blogs.html`);
         }, 500);
      }
   } catch (err) {
      console.log(err);
   }
};

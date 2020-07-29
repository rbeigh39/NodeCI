/* ELEMENTS */
const fab = document.querySelector('.fab');
const btnCancel = document.getElementById('btn-cancel');
const createBlogContainer = document.querySelector('.create');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');

const blogContainer = document.getElementById('my-blogs-container');
const newBlogForm = document.getElementById('new-blog-form');

import { login, signup, logout } from './login';
import { myBlogs, createNewBlog } from './myBlogs';

if (blogContainer) {
   myBlogs();
}

if (newBlogForm) {
   newBlogForm.addEventListener('submit', e => {
      e.preventDefault();

      const title = document.getElementById('blog-title').value;
      const content = document.getElementById('blog-content').value;

      createNewBlog(title, content);
   });
}

if (fab && createBlogContainer) {
   fab.addEventListener('click', e => {
      createBlogContainer.classList.toggle('create__visible');
   });
}

if (btnCancel && createBlogContainer) {
   btnCancel.addEventListener('click', e => {
      createBlogContainer.classList.toggle('create__visible');
   });
}

if (loginForm) {
   loginForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      login(email, password);
   });
}

if (signupForm) {
   signupForm.addEventListener('submit', e => {
      e.preventDefault();

      let info = {};

      info.name = document.getElementById('name').value;
      info.email = document.getElementById('email').value;
      info.password = document.getElementById('password').value;
      info.passwordConfirm = document.getElementById('password-confirm').value;

      signup(info);
   });
}

if (logoutBtn) {
   logoutBtn.addEventListener('click', () => {
      logout();
   });
}

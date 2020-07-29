/* esline-disable */

// type is either 'success' or 'error'
const hideAlert = () => {
   const el = document.querySelector('.alert');
   if (el) el.parentNode.removeChild(el);
};

export const showAlert = (type, message) => {
   hideAlert();

   const markup = `<div class="alert alert--${type} alert--visible"><p class="alert__text">${message}</p></div>`;

   document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
   window.setTimeout(hideAlert, 3000);
};

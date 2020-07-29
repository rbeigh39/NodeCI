/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

axios.defaults.withCredentials = true;

export const login = async (email, password) => {
   try {
      const res = await axios({
         method: 'POST',
         url: `${window.url}/api/v1/users/login`,
         data: {
            email,
            password
         }
      });

      if (res.data.status === 'success') {
         showAlert('success', 'Logged in successfully!');
      }

      window.setTimeout(() => {
         location.assign(`${window.clientUrl}/my-blogs`);
      }, 500);
   } catch (err) {
      showAlert('error', err.response.data.message);
   }
};

export const signup = async info => {
   try {
      const res = await axios({
         method: 'POST',
         url: `${window.url}/api/v1/users/signup`,
         data: {
            name: info.name,
            email: info.email,
            password: info.password,
            passwordConfirm: info.passwordConfirm
         }
      });

      if (res.data.status === 'success') {
         showAlert('success', 'Signup successful!');
      }

      window.setTimeout(() => {
         location.assign(`${window.clientUrl}/my-blogs`);
      }, 500);
   } catch (err) {
      showAlert('error', err.response.data.message);
   }
};

export const logout = async () => {
   await axios({
      method: 'GET',
      url: `${window.url}/api/v1/users/logout`
   });

   location.assign(`${window.clientUrl}/login`);
};

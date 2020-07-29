const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get(
   '/testLogin',
   (req, res, next) => {
      req.body = {
         email: 'admin@rayan.io',
         password: 'test1234',
      };

      next();
   },
   authController.login
);

module.exports = router;

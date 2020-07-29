const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getBlogsPage);
router.get('/my-blogs', viewsController.getBlogsPage);
router.get('/login', viewsController.getLoginPage);
router.get('/signup', viewsController.getSignupPage);

module.exports = router;

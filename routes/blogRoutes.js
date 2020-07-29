const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const { cleanCache } = require('../utils/cache');

const router = express.Router();
// router.get('/', authController.protect, (req, res, next) => {
//    console.log(req.url, 'into the middleware');
//    res.end('dont');
// });

router
   .route('/')
   .get(authController.protect, blogController.getAllBlogs)
   .post(authController.protect, cleanCache, blogController.createBlog);

router.route('/:id').get(authController.protect, blogController.getBlog);

module.exports = router;

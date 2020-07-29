const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { LexModelBuildingService } = require('aws-sdk');

const getBlogsPage = catchAsync(async (req, res, next) => {
   res.status(200).render('myBlogs');
});

const getLoginPage = catchAsync(async (req, res, next) => {
   res.status(200).render('login');
});

const getSignupPage = catchAsync(async (req, res, next) => {
   res.status(200).render('signup');
});

module.exports = {
   getBlogsPage,
   getLoginPage,
   getSignupPage
};

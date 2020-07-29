const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = id => {
   return jwt.sign({ id }, process.env.JWT_SECERET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
};

const createSendToken = (user, statusCode, res) => {
   const token = signToken(user._id);

   const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 86400000),
      httpOnly: true
   };

   if (process.env.NODE_ENV === 'production') cookieOptions.secure = false;

   res.cookie('jwt', token, cookieOptions);

   res.status(statusCode).json({
      status: 'success',
      token,
      data: {
         user
      }
   });
};

const signup = catchAsync(async (req, res, next) => {
   const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
   };
   const newUser = await User.create(userData);

   newUser.password = undefined;

   createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select('+password');

   if (!user || !(await user.checkPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));

   user.password = undefined;
   createSendToken(user, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }

   if (!token)
      return next(
         new AppError(
            'You are not logged in! Please log in to get access.',
            401
         )
      );

   const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECERET
   );

   const currentUser = await User.findById(decodedToken.id);
   if (!currentUser)
      return next(
         new AppError(
            'The user belonging to this token does no longer exist.',
            401
         )
      );

   req.user = currentUser;
   next();
});

const isLoggedIn = catchAsync(async (req, res, next) => {
   // 1) Getting the token and check if it is there
   try {
      if (req.cookies.jwt) {
         const token = req.cookies.jwt;

         // 1) Verification of the token
         const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECERET
         );

         // 2) Check if the user still exist
         const currentUser = await User.findById(decoded.id);
         if (!currentUser) return next();

         // THERE IS A LOGGED IN USER
         res.locals.user = currentUser;
         // req.user = currentUser;
         console.log('Checking is logged in');
         return next();
      }
   } catch (err) {
      return next();
   }

   next();
});

const logout = (req, res, next) => {
   res.cookie('jwt', 'logged-out', {
      expiresIn: new Date(Date.now() + 1000),
      httpOnly: true
   });

   res.status(200).json({
      status: 'success'
   });
};

module.exports = {
   signup,
   login,
   logout,
   protect,
   isLoggedIn
};

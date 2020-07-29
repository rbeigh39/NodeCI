const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const { clearHash } = require('../utils/cache');

const getAllBlogs = catchAsync(async (req, res, next) => {
   // const blogs = await Blog.find({ user: req.user.id }).cache();
   const blogs = await Blog.find({ user: req.user.id }).cache({
      key: req.user.id,
   });

   res.status(200).json({
      status: 'success',
      results: blogs.length,
      data: blogs,
   });
});

const getBlog = catchAsync(async (req, res, next) => {
   const blog = await Blog.findOne({
      _id: req.params.id,
      user: req.user._id,
   });

   res.status(200).json({
      status: 'success',
      data: {
         blog,
      },
   });
});

const createBlog = catchAsync(async (req, res, next) => {
   req.body.user = req.user._id;

   const blog = await Blog.create(req.body);
   res.status(200).json({
      status: 'success',
      data: blog,
   });
});

module.exports = {
   getAllBlogs,
   getBlog,
   createBlog,
};

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Blog must belong to a user'],
   },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

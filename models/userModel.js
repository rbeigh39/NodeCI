const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
      // unique: true
   },
   password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password must contain at least 8 characters'],
      select: false
   },
   passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
         validator: function(val) {
            return val === this.password;
         },
         message: 'Passwords do not match'
      }
   },
   role: {
      type: String,
      default: 'user'
   }
});

userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password, 12);

   this.passwordConfirm = undefined;
   next();
});

/* INSTANCE METHODS */
userSchema.methods.checkPassword = async function(
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

/**
 * User Model
 */

import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { isEmail } from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

import constants from '../config/constants';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          return isEmail(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

// Hash the user password on creation
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  /**
   * Hash the user password
   *
   * @private
   * @param {String} password - user password choose
   * @returns {String} password - hash password
   */
  _hashPassword(password) {
    return hashSync(password);
  },

  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },

  /**
   * Give only what we want from the user
   *
   * @returns {Object} user - user._id && an JWT token
   */
  toJSON() {
    return {
      _id: this._id,
      token: this.createToken(),
    };
  },
};

const User = mongoose.model('User', UserSchema);

export default User;

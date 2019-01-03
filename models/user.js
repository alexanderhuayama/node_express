'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const isEmail = email => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Create schema of mongoose
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: [isEmail, 'Invalid email']
  },
  photo: {
    type: String,
    default: 'https://gravatar.com/avatar/d4a175d5894d60b5e46ca4d472d69a30?s=400&d=robohash&r=x',
    required: false,
    trim: true
  },
  enable: {
    type: Boolean,
    default: true,
    required: false
  },
  registerDate: {
    type: Date,
    default: new Date()
  },
  updateDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('user', UserSchema);

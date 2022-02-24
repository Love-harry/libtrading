const { Number } = require('mongoose');
const mongoose = require('mongoose');

// bitcoin, bonus, margin, deposit, withdraw, total

const UserSchema = new mongoose.Schema({
  bitcoin: {
    type: String,
    required: true
  },
  bonus: {
    type: String,
    required: true
  },
  deposit: {
    type: String,
    required: true
  },
  withdraw: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

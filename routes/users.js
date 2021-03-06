const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


// password reset Page
router.get('/reset', forwardAuthenticated, (req, res) => res.render('reset'));

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


// Register
router.post('/register', (req, res) => {
  const { name, email, country, phone, password, password2, bitcoin, bonus, deposit, withdraw, total } = req.body;
  let errors = [];

  if (!name || !email || !country || !phone || !password || !password2 || !bitcoin || !bonus || !deposit || !withdraw || !total) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be (6) or more' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      country,
      phone,
      password,
      password2,
      bitcoin,
      bonus,
      deposit,
      withdraw,
      total
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          country,
          phone,
          password,
          password2,
          bitcoin,
          bonus,
          deposit,
          withdraw,
          total
        });
      } else {
        const newUser = new User({
          name,
          email,
          country,
          phone,
          password,
          bitcoin,
          bonus,
          deposit,
          withdraw,
          total
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You registered and can now login'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/wallet',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

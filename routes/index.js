const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('home'));
router.get('/exchange', forwardAuthenticated, (req, res) => res.render('exchange'));
router.get('/markets', forwardAuthenticated, (req, res) => res.render('markets'));
router.get('/symbol', forwardAuthenticated, (req, res) => res.render('symbol'));
router.get('/heatmap', forwardAuthenticated, (req, res) => res.render('heatmap'));
router.get('/analysis', forwardAuthenticated, (req, res) => res.render('analysis'));
router.get('/404', forwardAuthenticated, (req, res) => res.render('404'));

// Dashboard
router.get('/wallet', ensureAuthenticated, (req, res) =>
  res.render('wallet', {
    user: req.user
  })
);
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);
router.get('/settings', ensureAuthenticated, (req, res) =>
  res.render('settings', {
    user: req.user
  })
);

module.exports = router;

// MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
// REFs
require('../../utils/auth/localStrategy')
const User = require('../../models/User');
const plainLayout = 'layouts/plain-layout.ejs';
// MIDDLEWARE
const { loggedIn, loggedOut, preCheck } = require('../../utils/middleware/authMiddleware');

// LOGIN PAGE ROUTE
router.get('/auth', loggedOut, (req, res) => {
  const response = {
    title: "Login",
    error: req.query.error,
    layout: plainLayout,
  }
  res.render('admin/auth', response);
});
// LOGIN/LOGOUT HANDLE
router.post('/auth', preCheck, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth?error=true'
  //successFlash: 'Welcome!',
  //failureFlash: 'Invalid username or password.'
})
);
// LOGOUT HANDLE
router.get('/logout', loggedIn, (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) throw err;
  });
  res.clearCookie('sid');//maybe redundant
  res.redirect('/auth');
});

// DEV ROUTE - INJECT ADMIN INTO DB
router.get('/setup', async (req, res) => {
  const exists = await User.exists({ username: "aca" });
  if (exists) {
    console.log("Exists = " + exists);
    res.redirect('/auth')
  };
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash("grummF8Fbc", salt, function (err, hash) {
      if (err) { return next(err); }
      const newAdmin = new User({
        username: "aca",
        role: "creator",
        password: hash
      });
      newAdmin.save();
      res.redirect('/auth');
    });
  });
});

module.exports.router = router;

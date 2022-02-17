// MODULES
const express = require('express');
const router = express.Router();
// REFs
const User = require('../../models/User');
// MIDDLEWARE
const { loggedIn } = require('../../utils/middleware/authMiddleware');
// LAYOUT
const dashLayout = 'layouts/dash-layout';

// DASHBOARD ROUTES
router.get('/', loggedIn, async (req, res) => {
  try {
    const users = await User.findOne({ username: req.user.username });
    //req.flash('success_msg', "Login Successful");
    res.render('admin/dashboard', { username: users.username, layout: dashLayout });
  } catch (err) {
    //req.flash('error_msg', "Login Failed");
    res.redirect('/');
  }
});
// EDIT PAGES (INFO) ROUTES
router.get('/edit-pages', loggedIn, (req, res) => {

  res.render('admin/edit-pages', { layout: dashLayout });

});

module.exports.router = router;
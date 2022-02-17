const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy
// project modules
const User = require('../../models/User')

// setup strategy
passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorect username.' }); }
    bcrypt.compare(password, user.password, function (err, res) {
      if (err) { return done(err); }
      if (res === false) { return done(null, false, { message: 'Incorect password.' }); }
      return done(null, user);
    })
  })
}));
// save serial to the user
passport.serializeUser(function (user, done) {
  done(null, user.id);
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
});
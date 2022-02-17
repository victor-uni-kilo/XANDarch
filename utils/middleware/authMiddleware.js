const loggedIn = function (req, res, next) {
    if (req.isAuthenticated()) { return next() };
    res.redirect('/auth');
};

const loggedOut = function (req, res, next) {
    if (!req.isAuthenticated()) { return next() };
    res.redirect('/dashboard');
};

const preCheck = function (req, res, next) {
    const { username, password } = req.body;
    logError = '';
    //check required fields
    const alphaNum = /^[a-zA-Z0-9\-]+$/;
    const allowedUser = alphaNum.test(username);
    const allowedPass = alphaNum.test(password);
    if (!username || !password) {
      logError = "Please fill in all fields";
    } else if (allowedUser != true || allowedPass != true) {
      console.log("allowedUser:" + allowedUser, "allowedPass:" + allowedPass);
      logError = "No Special Characters";
    }
    if (logError != '') {
      const response = {
        title: "Login",
        error: req.query.error,
        layout: plainLayout,
        logError,
        username
      }
      res.render('admin/auth', response); // <-- kako da se doda samo error i onda redirect
    } else {
      return next();
    }
  };

  module.exports = { loggedIn, loggedOut, preCheck }

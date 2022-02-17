// IMPORT MODULES
const express = require('express');
// const cors = require('cors');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const methodOverride = require('method-override');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xssClean = require('xss-clean');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
// PROJECT MODULES
require('./utils/db.config')
require('./utils/gfs.config')

// START
const app = express();
// HIDE EXPRESS INFOo
app.disable('x-powered-by');
// IMPORT ROUTERS
const authRouter = require('./routes/default/auth');
const indexRouter = require('./routes/default/index');
const imageRouter = require('./routes/shared/imageRoutes')
const dashboardRouter = require('./routes/admin/dashboard');
const editProjectRouter = require('./routes/admin/edit-project');

// SET VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
// USE- GLOBAL MIDDLEWARE
// app.use(helmet());
app.use(express.urlencoded({ limit: '10mb', extended: false }));
// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());
// Data sanitization against XXS attacks
// app.use(xssClean());

// app.use(cors());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //for testing only
app.use(expressLayouts);

// TRUST HEROKU FOR COOKIES
const sessionStore = MongoStore.create({ mongoUrl: process.env.DATABASE_URL });
var sess = {
  name: 'sid',
  secret: "verygoodsecret",
  saveUninitialized: false,
  resave: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 6,
    sameSite: true,
    secure: false
  }
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
//SESSION secret: process.env.SECRET,
/*You should only set the cookie as secure if you are using https in later stages 
of your development pipeline, and definitely in production. If you set maxAge, 
the cookie will be persisted, which is not the best practice for session cookies. 
Without maxAge, the cookie will be kept until the user closes the browser and 
not normally persisted to disk, which is the correct behaviour for session cookies.*/
//FLASH
app.use(flash());
//app.use((req, res, next) => {
//    res.locals.success_msg = req.flash('success_msg');
//    res.locals.error_msg = req.flash('error_msg');
//    next();
//});
//USE PASSPORT
app.use(passport.initialize());
app.use(passport.session());//persistance on the website
//DELETE THIS
//app.use((req, res, next) => {
//    //console.log(req.session);
//    //console.log(req.user);
//    //console.log(req.session.cookie);
//    next();
//})

//USE ROUTES 
app.use('/', authRouter.router);
app.use('/', indexRouter.router);
app.use('/', imageRouter.router);
app.use('/dashboard', dashboardRouter.router);
app.use('/dashboard/edit-project', editProjectRouter.router);
//ERROR HANDLERS
app.locals = {
  filters: false
}

//404
app.use(function (req, res, next) {
  res.status(404).render('default/404', { layout: 'layouts/plain-layout' });
  next();//handle layouts for these pages
});
//LISTEN
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running at port 3000')
})

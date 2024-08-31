var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require("multer");
var cors = require('cors');
const morgan = require('morgan');

const { adminAuth, clientsAuth } = require('./auth/auth');
const { verifyResetPasswordToken } = require('./auth/resetPassword');
const userCookies = require('./service/userCookies');

require('dotenv').config({path: 'sample.env'});

const queryRouter = require('./routes/queries');
const sendProof = require('./routes/sendProof');
const jwtauth = require('./routes/jwt/jwtauthetication');
const jwtVerify = require('./routes/jwt/jwtverification');
const getNotificationById = require('./routes/notificationServer');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts/')));
app.use(express.static(path.join(__dirname, 'admin/javascripts/')));


//the following works to link public
app.use("/public", express.static(process.cwd() + "/public"));
app.use("/admin", express.static(process.cwd() + "/admin"));
app.use('/admin/javascripts', express.static('public/javascripts'));
app.use('/admin/javascripts', express.static(path.join(__dirname, 'public/javascripts')));
app.use("/api/auth", require("./auth/route"));
app.use(morgan('dev'));


app.get('/public/javascripts/userData.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', 'javascripts', 'userData.js'));
});

app.use(function(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});


//my routes
app.get('/', (req, res) => res.render("home"));
app.get("/signup", (req, res) => res.render("signup"))
app.get("/signin", (req, res) => res.render("signin"))
app.get("/resetpasswordemail", (req, res) => res.render("resetPasswordEmail"))
app.get("/api/auth/reset-password/:jwtResetPassword", verifyResetPasswordToken, (req, res) => res.render("resetPassword"))
app.get("/admin/signin", (req, res) => res.render("adminsignin"))
app.get('/tenglobalhome', clientsAuth, (req, res) => res.render("tenglobalHome"));
app.get("/admin", adminAuth, (req, res) => res.render("admin"));
app.get("/api/auth/signout", (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

//revoke token
app.get("/logout", (req, res) => {
  console.log({ message: "Logged out successfully" })
  res.cookie("jwt", "", { maxAge: "1" })
  res.redirect("/")
});

app.get('/example.env.json', (req, res) => {
  res.sendFile(__dirname + '/example.env.json');
});

app.get('/users/all', adminAuth, queryRouter.getUsers);
app.get('/userbyid', userCookies.userCookies)
app.get('/users/details',adminAuth, queryRouter.getUsersDetails);
app.get('/users/:id', queryRouter.getUserById);
app.get('/users/details', queryRouter.getUsersEmail);
app.get('/users/generate_token', jwtauth.generateToken);
app.get('/users/validation', jwtVerify.jwtVerification);
app.get('/notificationbyid/:user_id', clientsAuth, getNotificationById.getNotificationById);
app.post('/updateall/notifications/:user_id', clientsAuth, getNotificationById.updateAllNotificationsReadStatus);
app.post('/updateall/notifications/:user_id/:notification_id', clientsAuth, getNotificationById.updateNotificationByIdReadStatus);
app.get('/api/auth/getproofbyid/:user_id', clientsAuth, sendProof.getProofById);
app.post('/api/auth/sendproof', clientsAuth, sendProof.sendProof);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

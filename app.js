var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var usersRouter = require('./routes/users');
var shopRouter=require('./routes/shopping');
var shopitem=require('./routes/shopitem');
var cartRouter=require('./routes/cart');
var deliveryRouter=require('./routes/delivery');
var feedbackRouter=require('./routes/feedback');
var messageRouter=require('./routes/message');
var app = express();
var passport = require('passport');
var authenticate = require('./authenticate');

const mongoose=require('mongoose');
const url='mongodb+srv://Sanjeet:Sanjeet@cluster0-5et2v.mongodb.net/test?retryWrites=true&w=majority';

const connect=mongoose.connect(url);
connect.then((db)=>{
  console.log("connected");
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'sanjeet',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: false,
  store: new FileStore({logFn: function(){}})
 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/shopping',shopRouter);
app.use('/message',messageRouter);
app.use('/shopitem',shopitem);
app.use('/cart',cartRouter);
app.use('/delivery',deliveryRouter);
app.use('/feedback',feedbackRouter);
// catch 404 and forward to error handler
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
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

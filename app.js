var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var ejs = require('ejs'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
// var timetableRouter = require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//登录拦截器
app.use(function (req, res, next) {
  var url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址；
  var userCookies=req.cookies.username; //获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，//因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
  if(url=='/user/login'&&userCookies!=undefined){ //通过判断控制用户登录后不能访问登录页面；
      return res.redirect('/');//页面重定向；
  }else{
    next();
  }
  
});
app.use('/', indexRouter);
app.use('/user', usersRouter);
// app.use('/timetable',timetableRouter);
app.get('/user/logout', function (req, res) {
    res.clearCookie('username');
    return res.redirect('/user/login');//页面重定向；
});


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

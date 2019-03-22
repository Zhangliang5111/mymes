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
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

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
app.all('/*', function(req, res, next){
  if (req.session.user) {
    next();
  }else {
    var arr = req.url.split('/');// 解析用户请求的路径

    for (var i = 0, length = arr.length; i < length; i++) {// 去除 GET 请求路径上携带的参数
      arr[i] = arr[i].split('?')[0];
    }
    if (arr.length > 1 && arr[1] == '') {// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
      next();
    } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'res' || arr[2] == 'login' || arr[2] == 'logout' || arr[2].indexOf('login') >= 0 )) {
      next();
    } else {  // 登录拦截
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
     console.log("错误：请先登录")
      res.redirect('/user/login');  // 将用户重定向到登录页面
    }
  }
});
app.use('/', indexRouter);
app.use('/user', usersRouter);
// app.use('/timetable',timetableRouter);

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

var express = require('express');
var app = express();

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

//session模块导入
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
//redis配置参数
var config_redis = require('./config-redis');
//session配置
app.use(session({
  name:'sid',                									//这里的name值得是cookie的name，默认cookie的name是：connect.sid
  secret:'iamkey',        										//用来对session id相关的cookie进行签名(值可以是任意值)表示密钥
  store: new RedisStore(config_redis.session),//利用redis存储session
  saveUninitialized: false,										//是否自动保存未初始化的会话,建议false
  resave: true,																//是否每次都重新保存会话,建议fasle,
  rolling:true,
  cookie:config_redis.cookie
}));

//分发路由文件
var routes = require("./routes");
routes(app);

//模板的路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', './src/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

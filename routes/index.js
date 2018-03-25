//用户权限控制
var session = require('./session');

module.exports = function(app) {

	//首页
	app.get('/',session.out,function(req, res, next) {	
		//res.json({ message: 'hello index!'});
		res.render('index');
	});
	
	
	//【登录注册】路由分发
	var loginRegist = require('./loginRegist');
	app.use('/loginRegist',loginRegist);
	
}
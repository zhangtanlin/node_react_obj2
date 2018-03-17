//session验证
var session = require('./session.js');

module.exports = function(app) {

	//首页
	app.get('/',function(req, res, next) {	
		//res.json({ message: 'hello index!'});
		res.render('index');
	});
	
	
	//【登录注册】路由分发
	var loginRegist = require('./loginRegist');
	app.use('/loginRegist',session.sessionVerify,loginRegist);
	
}
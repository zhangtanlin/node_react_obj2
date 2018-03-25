var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//解决post提交时req.body为undefind
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//用户权限控制
var session = require('./session');

//登录界面获取
router.get('/',session.out,function(req,res,next){
	res.render('login');
});

//登录提交
router.post('/loginPost',function(req, res, next){
	//引入登陆注册model
	var m_loginregist = require('../models/m_loginregist');
	var params = req.body;
	m_loginregist.find({}, function(err, resData) {
        if(err) return next(err);
        var state = false,
        	message = '验证失败',
        	address = '/loginregist',
        	userName = '';
        for(let i = 0; i < resData.length; i++) {
            if(resData[i].userName == params.userName && resData[i].userPassword == params.userPassword) {
            	//session存储的数据
            	var user = {
            		userName:resData[i].userName,
            		userPassword:resData[i].userPassword
            	};
                //创建session
                req.session.user = user;
            	req.session.save();  //保存修改后的Session
                //返回信息
                state = true,
                message = '验证成功',
                address = '/',
                userName = resData[i].userName
                break;
            }
        }
        res.send({
            'state' : state,
            'message' : message,
            'address' : address,
            'userName' : userName
        });
    });
});

//获取登录状态
router.post('/loginState',function(req,res,next){
	var params = req.body,
		userName = '',
		hasLogined = false;
	if(req.session.user != undefined){
		userName = req.session.user.userName;
		hasLogined = true;
	}
	res.send({'userName':userName,'hasLogined':hasLogined});
});

module.exports = router;
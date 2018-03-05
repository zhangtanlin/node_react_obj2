var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

//解决post提交时req.body为undefind
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//token设置
const jwt = require('jsonwebtoken');
const config = require('../config');

//登录界面获取
router.get('/',function(req,res,next){
	res.render('login');
});

//登录提交
router.post('/loginPost',function(req, res, next){
	console.log(req.body);
	//引入登陆注册model
	var m_loginregist = require('../models/m_loginregist');
	var params = req.body;
	m_loginregist.find({}, function(err, resData) {
		console.log(resData);
        if(err) return next(err);
        for(let i = 0; i < resData.length; i++) {
            if(resData[i].user_name == params.user_name 
            	&& resData[i].user_password == params.user_password) {
                //创建token
                var token = jwt.sign({name: resData[i].user_name}, config.token,{
		            expiresIn: 1000
		        });
                
                res.send({
                    'state': true,
                    'message':'验证成功',
                    'address': '/',
                    'token':token
                });
                return false;
            }
        }
        res.send({
            'state': false,
            'message':'验证失败',
            'address': '/loginregist'
        });
    });
});


module.exports = router;
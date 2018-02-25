//创建 mongodb数据库连接
var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.connect(config.mongodb, {
    useMongoClient: true
}); //红色为数据库名

//连接数据库Model
var loginRegistSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    user_password: {
        type: String,
        require: true
    },
    user_phone: {
        type: String,
        require: true
    },
    user_operation_time: {
        type: Date,
        default: Date.now()
    },
    user_type: {
        type: String
    },
    token:{
    	type: String,
        require: true
    }
});
var m_loginregist = mongoose.model("loginRegist", loginRegistSchema, "user");
module.exports = m_loginregist;
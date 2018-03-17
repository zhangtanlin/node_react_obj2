//创建 mongodb数据库连接
var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.connect(config.mongodb, {
    useMongoClient: true
});
//连接数据库Model
var loginRegistSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    userPassword: {
        type: String,
        require: true
    },
    userPhone: {
        type: String,
        require: true
    },
    userOperationTime: {
        type: Date,
        default: Date.now()
    },
    userType: {
        type: String
    }
});
var m_loginregist = mongoose.model("loginRegist", loginRegistSchema, "user");
module.exports = m_loginregist;
var redis = {
	session:{
		'host': '127.0.0.1',
		'port': '6379',
		'db':1,
		//"ttl": 60 * 60 * 24 * 30   //Session的有效期为30天
		'ttl': 60 * 1
	},
	cookie:{
		'maxAge':1000 * 60
	}
	
}

module.exports = redis;
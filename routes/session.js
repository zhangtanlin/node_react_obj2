var session = {
	out:function(req, res, next) {
		//console.log(typeof(req.session.user))
//		return false;
		if(typeof(req.session.user) == 'undefined'){
			res.render('login');
		}else{
			next();
		}
	}
}
module.exports = session;
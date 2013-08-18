
var flasherror = 'error';

exports.login = function(req,res){
	res.render('login', { message: req.flash( flasherror ) } );
};


exports.loginsuccess = function(req, res){
	res.send("Logged in");
};

exports.logout = function(req,res){
	res.send("Logged out");
};
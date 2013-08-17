
var flasherror = 'error';

module.exports = function(req,res){
	res.render('login', { message: req.flash( flasherror ) } );
};
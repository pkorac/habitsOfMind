/*

Landing Page


*/

exports.landing = function(req, res){
	res.render('landing', { title: "Tallis habits project" } );
}

exports.about = function(req,res){
	res.render('about', { title: "About" } );
};

exports.contact = function(req,res){
	res.render('contact', { title: "Contact" } );
};
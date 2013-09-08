/*

Landing Page


*/
var config = require('../config');

exports.landing = function(req, res, next){
	if ( req.session && req.session.usertype ){
		res.redirect( config.userTypes[ req.session.usertype ] );
	} else{
		res.render('landing', { title: "Tallis Habits",
								subtitle: "How are you learning?" } );
	}	
}

exports.about = function(req,res){
	res.render('about', { title: "About",
						  subtitle: null } );
};

exports.contact = function(req,res){
	res.render('contact', { title: "Contact",
							subtitle: null } );
};
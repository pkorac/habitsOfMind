var db = require('../db'),
	config = require('../config'),
	util = require('util');

exports.landing = function(req,res){
	res.render('students/landing', {title: req.session.username,
									subtitle: "How are you today?"
	} );
};

exports.editProfile = function(req,res,next){
	db.findUserbyName( req.session.username, function(err, user){
		if( err ) {
			next();
		}else{	
			
			res.render('students/edit', {  title: "Edit profile",
										subtitle: null,
										id: user._id,
										username: user.name,
										email: user.email,
										messageSuccess: req.flash(config.flashMessageSuccess),
										messageError: req.flash(config.flashMessage)
									} );
		}
	} );
}

exports.editProfileSubmit = function(req,res,next){
	if ( req.body ){
		
		if ( req.body.newPassword1 !== req.body.newPassword2 ){
			req.flash( config.flashMessage, "Passwords don't match" );
			res.redirect( req.path );
			return;			

		} else{

			var id = req.body.id;
			var params = {
				email: req.body.email,
				password: req.body.newPassword1
			};
			
			db.editUser( id, params, function(err, updatedUser){
				if( err ){
					req.flash( config.flashMessage, err.message );
					res.redirect( req.path );
				} else{
					
					req.flash( config.flashMessageSuccess, "Details Saved");
					res.redirect( req.path );							
				}			
			} );		
		}
		
	} else{
		next();
	}	
};
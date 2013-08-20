var db = require('../db'),
	config = require('../config');

exports.landing = function(req,res){
	db.findUserbyName( req.session.username, function(err, user){
		if( err ) {
			next();
		}else{	
			
			res.render('students/landing', {id: user.id,
											username: user.name,
											email: user.email,
											gender: user.gender,
											habitsClass: user.habitsClass,
											genders: config.genders,
											message: req.flash(config.flashMessage) } );
		}
	} );
};

exports.editProfileSubmit = function(req,res,next){
	if ( req.body ){
		
		var id = req.body.id;
		var params = {
			email: req.body.email,
			password: req.body.password,
			gender: req.body.gender
		};
		
		console.log( params );
		
		db.editUser( id, params, function(err, updatedUser){
			if( err ){
				req.flash( config.flashMessage, err.message );
				res.redirect( '/students/' );
			} else{
				
				req.flash( config.flashMessage, "Details Saved");
				res.redirect( '/students/' );							
			}			
		} );
	} else{
		next();
	}	
};
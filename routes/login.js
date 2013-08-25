
var config = require('../config'),
	db = require('../db'),
	util = require('util');

// Login
exports.login = function(req,res){
	res.render('login', { message: req.flash( config.flashMessage ) } );
};

// Login Succes
exports.loginSuccess = function(req, res){
	if ( req.session.usertype ){
		// Redirect to the first screen a user has
		res.redirect( config.userTypes[ req.session.usertype ][0] + "/" );
	} else{
		res.send("Logged in");		
	}
};

// Logout
exports.logout = function(req,res){
	res.render('logout', {} );
};


// Register
exports.register = function(req,res,next){
	res.render( 'register', {message: req.flash(config.flashMessage)} );
};

exports.registerSubmit = function(req,res,next){

	if (req.body){
		var secret = req.body.secret;
		var token = req.body.token;
		if( secret && token ){
			
			db.findUserbyValidationToken( token, function(err, user){
				if( err || !user ){
					req.flash( config.flashMessage, "Wrong Credentials" );
					res.redirect( '/register' );
					return;
				} else{
					res.render('registerAddDetails', {message: req.flash(config.flashMessage),
														id: user._id } );
				}
			});		
			
		} else{
			req.flash( config.flashMessage, "Both fields must be filled out" );
			res.redirect( '/register' );
		}
	}else{
		next();
	}

};

exports.registerDetails = function(req,res,next){
	
	if ( req.body && req.body.id ){
		var username = req.body.username;
		var email = req.body.email;
		var password = req.body.password;
		var id = req.body.id;		

		
		if ( username && email && password  ){			
			
			db.registerUser( id, username, password, email, function( err, user ){
				if(err){
					//console.log(err);
					req.flash( config.flashMessage, err.message );
					res.render('registerAddDetails', {message: req.flash(config.flashMessage), id: id} );
				} else if(user){
					
					res.render('registered', {username: user.name});
					
				} else{
					req.flash( config.flashMessage, "Something went wrong" );
					res.render('registerAddDetails', {message: req.flash(config.flashMessage), id: id} );
				}
				
			} );
			
		} else{
			req.flash( config.flashMessage, "Fill out all the fields" );
			res.render('registerAddDetails', {message: req.flash(config.flashMessage), id: id} );
		}
				
	} else{
		next();	
	}
};
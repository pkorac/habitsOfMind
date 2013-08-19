// Requires
var	express = require('express'),
	flash = require('connect-flash'),
	url = require('url');

var db = require('./db'),
	config = require('./config');


///////////////////////////////////////////////////////////////////////////
//
// Authentication functions
//
///////////////////////////////////////////////////////////////////////////

// LOGIN

function login( req, res, next ){
	if ( req.body && req.body.username ){
		
		db.findUserbyName( req.body.username, function(err, user){
			
			if (!user){
				// No such user
				req.flash( config.flashMessage, 'Wrong username');
				res.redirect( config.loginRoute );
				return false;

			} else{
				
				if ( user.validationtoken ){
					// should authorize with the token
					res.redirect( config.registerRoute );
					return false;
				}
				
				db.checkPassword( req.body.password, user.password, function(err, passcheck){
					
					if (!passcheck || err){
						// wrong pass
						req.flash(config.flashMessage, 'Wrong password');
						res.redirect( config.loginRoute );
						return false;
					} else{
						// right pass
						req.session.username = user.name
						req.session.usertype = user.type;
						req.session.auth = true;
						next();
					}
					
				} );
			}
			
		} );
		
	} else{
		// No username submited
		req.flash( config.flashMessage, 'No username or data submitted');
		res.redirect( config.loginRoute );
		return false;
	}
}


// LOGOUT
function logout(req,res,next){
	req.session = null;
	next();
}

// AUTHENTICATION CHECK
function check( req, res, next ){
	var path = url.parse(req.url).pathname;
	path = path.split("/")[1];
	
	if ( path && req.session && req.session.auth === true ){ // am I authenticated		
		var allowedRoutes = config.userTypes[ req.session.usertype ]; // which routes can I go to		
		if ( !allowedRoutes ) console.log( "something went wrong ");
				
		for ( var i = 0; i < allowedRoutes.length; i ++){
			if ( allowedRoutes[i] === path ) {
				//console.log("Good to go here");
				next();
				return;
			}
		}
		//console.log( "Not allowed here" );
		res.redirect( config.deniedRoute );		
	} else{
		res.redirect( config.loginRoute );
	}
}



///////////////////////////////////////////////////////////////////////////
//
// Exports
//
///////////////////////////////////////////////////////////////////////////
exports.check = check;
exports.login = login;
exports.logout = logout;




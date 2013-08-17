// Requires
var	express = require('express'),
	flash = require('connect-flash'),
	bcrypt = require('bcrypt'),
	url = require('url');

var db = require('./db'),
	config = require('./config');

var loginRoute = config.loginRoute;
var deniedRoute = config.deniedRoute;
	
// Config
var depth = 12;


///////////////////////////////////////////////////////////////////////////
// Authentication functions

// LOGIN
function login( req, res, next ){
	process.nextTick( function(){
		if ( req.body && req.body.username ){
			var user = db.findUserbyName( req.body.username );
			if ( !user ) {
				//console.log( "Wrong user" );
				req.flash('error', 'Wrong username');
				res.redirect( loginRoute );
				return false;
			} else if( !req.body.password || !bcrypt.compareSync( req.body.password, user.password ) ){
				//console.log( "Wrong password" );
				req.flash('error', 'Wrong password');
				res.redirect( loginRoute );
				return false;
			} else {
				//console.log( "Should start logging in" );
				req.session.usertype = user.type;
				req.session.auth = true;
				next();
			}
		}
	} );
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
		res.redirect( deniedRoute );		
	} else{
		res.redirect( loginRoute );
	}
}



///////////////////////////////////////////////////////////////////////////
// Supporting functions

// Find User by Name
function findUserbyName( name ){
	var users = db.users();
	for ( var i = 0; i < users.length; i++ ){
		if ( users[i].name === name ){
			return users[i];
		}
	}
	return null;
}


// Hash the password
function hash( pass ){
	if ( pass ){
		console.log("Hashing " + pass );
		bcrypt.hash( pass, depth, function(err, hash){
			if (!err) {
				console.log(hash);
				return false;
			} else{
				return hash;
			}
		} );
	}
	return false;
}


///////////////////////////////////////////////////////////////////////////
// Exports
exports.hash = hash;
exports.check = check;
exports.login = login;
exports.logout = logout;






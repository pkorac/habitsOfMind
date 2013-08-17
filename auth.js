// Requires
var	express = require('express'),
	bcrypt = require('bcrypt');

var db = require('./db');

var loginRoute = '/login';
	
// Config
var depth = 12;


///////////////////////////////////////////////////////////////////////////
// Authentication functions

// LOGIN
function login( req, res, next ){
	if ( req.body && req.body.username ){
		var user = findUserbyName( req.body.username );
		if ( !user ) {
			//console.log( "Wrong user" );
			res.redirect( loginRoute );
			return false;
		} else if( !req.body.password || !bcrypt.compareSync( req.body.password, user.password ) ){
			console.log( "Wrong password" );
			res.redirect( loginRoute );
			return false;
		} else{
			//console.log( "Should start logging in" );
			req.session.auth = true;
			next();
		}
	}
}

// LOGOUT
function logout(req,res,next){
	req.session = null;
	next();
}

// AUTHENTICATION CHECK
function check( req, res, next ){
	if ( req.session && req.session.auth === true ){
		next();	
	} else{
		res.redirect( loginRoute );
	}
}



///////////////////////////////////////////////////////////////////////////
// Supporting functions

// Find User by Name
function findUserbyName( name ){
	var users = db.uandp();
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






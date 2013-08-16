// Requires
var	express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	flash = require('connect-flash'),
	bcrypt = require('bcrypt');

var db = require('./db');
	
// Config
var depth = 12;


///////////////////////////////////////////////////////////////////////////
// Authentication functions


// Authentication strategy && password verification
passport.use(new LocalStrategy(
	function(username, password, done) {
		process.nextTick( function(){
			console.log("authentication strategy called");
			findUserByName( username, function(err, user){
				if(err) return done(err); // tough shit
				if(!user) return done( null, false, {message: "No such user"} ); // wrong username
				if( !bcrypt.compareSync( password, user.password ) ) return done(null, false, {message: "Wrong password"}); // wrong password
				return done( null, user ); // all good
				
			} );
			
		} );
	}
));

// Authenticate function (called on post)
function authenticate( success, failure ){
	return passport.authenticate('local', { 
									successRedirect: success,
									failureRedirect: failure,
									failureFlash: true });

}

// Session serialisation
passport.serializeUser(function(user, done) {
  done(null, [user.name, user.type] );
});

passport.deserializeUser(function(userdata, done) {
	findUserByName( userdata[0], function(err, user){
		done( err, [user.name, user.type] );
	} );
});

/*
passport.deserializeUser(function(username, done) {
	findUserByName( username, function(err, user){
		done( err, [user.name, user.type] );
	} );
});
*/




// Authentication Check (whether we're authenticated or not)
function authCheck( req, res, next ){
	console.log( req.user );
	if ( req.isAuthenticated() ) return next();
	res.redirect('login');
}


// Logout
function logout( path ){
	return function(req, res){
		req.logout();
		res.redirect( path );
	}
}


///////////////////////////////////////////////////////////////////////////
// Supporting functions

// Find users by name
function findUserByName( user, fn ){
	var users = db.uandp();
	for (var i = 0; i < users.length; i++){
		if( user === users[i].name ){
			return fn(null, users[i] );
		}
	}
	return fn(null, null);
};


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
exports.authCheck = authCheck;
exports.authenticate = authenticate;
exports.logout = logout;




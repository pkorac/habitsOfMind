var db = require('../db'),
	config = require('../config');


// LANDING
exports.landing = function( req, res ){
	res.render('admin/landing', {title: "Authentication start" });
};

/////////////////////////////////////////////
// USERS
exports.listusers = function( req, res ){
	res.render('admin/userslist', {users: db.listUsers() } );
};

// New
exports.newuser = function(req,res){
	res.render( 'admin/usernew', { types: config.userTypes } );
};

// Add user
exports.adduser = function(req,res){
	// Do stuff
	console.log("add user");
	res.redirect('/admin/users/created');
};

exports.usercreated = function(req,res){
	res.render('admin/usercreated', {});
};


/////////////////////////////////////////////
// CLASSES
exports.listclasses = function(req,res){
	res.send("Listing classes");
};

exports.newclass = function(req,res){
	res.render('admin/classnew', {});
};

exports.addclass = function(req,res){
	console.log("Adding class");
	res.redirect('/admin/classes/created');
};

exports.classcreated = function(req,res){
	res.render('admin/classcreated', {});
};

exports.newpopulation = function(req,res){
	res.send("New class population");
};

exports.populateclass = function(req,res){
	console.log("Populating class");
	res.redirect('/admin/classes/populated');
};

exports.classpopulated = function(req,res){
	res.render('admin/classpopulated', {});
};


exports.test = function(req,res){

	db.generateEmptyUsers( 40, function(err, tokens){
		console.log( tokens );
		res.send(tokens);
	} );
};
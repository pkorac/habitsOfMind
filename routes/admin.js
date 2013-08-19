var db = require('../db'),
	config = require('../config'),
	util = require('util');


// LANDING
exports.landing = function( req, res ){
	res.render('admin/landing', {title: "Admin area" });
};

/////////////////////////////////////////////
// USERS
exports.listUsers = function( req, res ){
	db.listUsers( function(err, users){
		res.render('admin/userslist', {users: users } );
	} );
};

// Create User
exports.createUser = function(req,res){
	res.render( 'admin/usercreate', { allTypes: config.userTypes, 
										defaultType: config.defaultUserType,
										defaultSecret: config.defaultUserSecret } );
};

// Craete User Submit
exports.createUserSubmit = function(req,res){
	
	if ( req.body ){

		var secret = req.body.secret;
		var type = req.body.usertype;
		
		if (secret && type){
			db.createEmptyUser( secret, type,  function(err, user, token){
				if(err){
					next();
				} else{
					console.log( util.inspect( user, {colors: true} ) );
					console.log( token );
					
					res.render('admin/usercreated', { secret: secret, token: token });
				}
			} );
		} else{
			next();
		}		
	} else {
		next();
	}
};


// Edit user
exports.editUser = function(req,res,next){
	var id = req.query.id;
	if ( id ){
		db.findUserbyId( id, function(err, user){
			if( user ) {
				res.render( 'admin/useredit', { 
						username: user.name,
						usertype: user.type,
						email: user.email || "",
						habitsClass: user.habitsClass,
						id: user.id,
						allTypes: config.userTypes
					} );	
			} else{
				next();
			}		
		} );
	} else{
		next();	
	}
};

exports.editUserSubmit = function(req,res,next){

	if( req.body ){
	
		var edit = {
			email: req.body.email,
			habitsClass: req.body.habitsClass,
			type: req.body.usertype,
			password: req.body.password
		};
		if ( edit.password.length < 1 )edit.password = null;	
	
		db.editUser( req.body.id, edit, function(err, user){
			if( user ){
				res.redirect("/admin/users/edit/?id="+user.id);
			}else{
				next();
			}
		} );
	}else{
		next();		
	}
};

// Delete user
exports.deleteUser = function(req,res, next){
	
	if ( req.query ){
		var id = req.query.id;
		var username = req.query.username;
		
		if( id && username ){				
			res.render( 'admin/userdelete', { id: id, username: username } );				
		} else{
			next();
		}
	} else{
		next();
	}
};

// DeleteUser submit
exports.deleteUserSubmit = function(req,res,next){
	
	var id = req.body.id;
	var username = req.body.username;
	if( id && username ){
		db.deleteUser( id, function(err){
			if(!err){				
				res.render('admin/userdeleted', {username: username});
			} else{
				next();
			}
		} );		
	} else {
		next();
	}

};




/////////////////////////////////////////////
// CLASSES
exports.listClasses = function(req,res){
	res.send("Listing classes");
};

exports.createClass = function(req,res){
	res.render('admin/classnew', {});
};

exports.createClassSubmit = function(req,res){
	res.send("Created");
};

exports.populate = function(req,res){
	res.send("Populate Class");
};

exports.populateSubmit = function(req,res){
	res.send("Populated");
};


exports.editClass = function(req,res){
	res.send("Edit Class");
};

exports.editClassSubmit = function(req,res){
	res.send("Edited");
};


exports.deleteClass = function(req,res){
	res.send("Delete Class");
};

exports.deleteClassSubmit = function(req,res){
	res.send("Deleted");
};




///////// TESTS ///////////
exports.test = function(req,res){

	db.createStudents( 80, "oranges", "9mm", function(err, tokens){
		res.send( tokens );
	} );
	
};

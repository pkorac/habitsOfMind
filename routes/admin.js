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

// Create User Page
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
			var habitsClass = req.body.habitsClass || null;
			//var year = parseInt(req.body.year) || config.defaultYear;
			
			// Create the user
			db.createUser( secret, type, null, habitsClass, null, function(err, newUser, token){
				if( err ){
					next();
				} else{
					//console.log( util.inspect( newUser, {colors: true} ) );
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


// Edit user Page
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
						allTypes: config.userTypes,
						genders: config.genders,
						gender: user.gender
					} );	
			} else{
				next();
			}		
		} );
	} else{
		next();	
	}
};

// Edit user submit
exports.editUserSubmit = function(req,res,next){

	if( req.body ){
	
		var edit = {
			id: req.body.id,
			email: req.body.email,
			habitsClass: req.body.habitsClass,
			type: req.body.usertype,
			password: req.body.password,
			gender: req.body.gender
		};
		if ( edit.password.length < 1 )edit.password = null;	
	
		db.editUser( edit.id, edit, function(err, user){

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

// Delete user Page
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

// Delete User submit
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
exports.listClasses = function(req,res,next){
	db.listClasses( function(err, classes){
		if(err){ 
			next(); 
			return;
		}
		res.render('admin/classlist', { classes: classes });		
	} );
};

// Create class
exports.createClass = function(req,res,next){
	res.render('admin/classcreate', { year: config.defaultYear, message: req.flash(config.flashMessage) });
};

// Create Class submit
exports.createClassSubmit = function(req,res,next){
	if( req.body ){
	
		var name = req.body.habitsClass;
		var year = parseInt( req.body.year );
		var teacher = req.body.teacher;
		
		if ( name && year && teacher ){
			db.createClass( name, year, teacher, function(err, newClass){
				if ( err ) {
					req.flash(config.flashMessage,err.message );
					res.redirect('/admin/classes/create');
					return;
				} else{
					// all good let's populate it with students now
					res.render('admin/classcreated', { id: newClass.id });
				}
			} );	
		} else{
			req.flash(config.flashMessage, "All fields must be filled out");
			res.redirect( '/admin/classes/create');
		}		
	} else{
		req.flash(config.flashMessage, "All fields must be filled out");
		res.redirect( '/admin/classes/create');
	}
};

// Populate a class
exports.populate = function(req,res){
	var id = null;
	if ( req.query && req.query.id) id = req.query.id;
	db.listClasses( function(err, classes){
		if ( err ){
			next();
		}{
			res.render('admin/classpopulate', { classes: classes, 
												defaultSecret: config.defaultUserSecret,
												message: req.flash(config.flashMessage),
												id: id} );
		}
	} );
};

// Populate class submit
exports.populateSubmit = function(req,res,next){
	if( req.body ){
		
		console.log( util.inspect( req.body, {colors: true} ) );
		
		var classid = req.body.classid;
		var secret = req.body.secret;
		var howMany = req.body.howMany;
		if( classid && secret && howMany ){
			
			db.createStudents( howMany, secret, classid, function(err, tokens){
				if( err ){
					req.flash(config.flashMessage, err.message );
					res.redirect('/admin/classes/populate');
				} else{
					// all good
					res.render( 'admin/classpopulated', { tokens: tokens, secret: secret } );
				}
				
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect('/admin/classes/populate');			
		}
	} else{
		req.flash(config.flashMessage, "All the fields must be filled out");
		res.redirect('/admin/classes/populate');		
	} 
};

// Edit class page
exports.editClass = function(req,res,next){
	
	if( req.query ){
	
		var id = req.query.id;
	
		if ( id ){
			db.findClassbyId( id, function(err, habitsClass){				
				console.log( util.inspect( habitsClass, {colors: true} ) );
				if ( err ){
					next();
					return;
				} else{
					res.render('admin/classedit', { message: req.flash(config.flashMessage),	
													teacher: habitsClass.teacher,
													year: habitsClass.year,
													name: habitsClass.name,
													id: habitsClass.id});
	
				}				
			} );		
		} else{
			next();
			return;
		}		
	} else{
		next();
		return;				
	}
};

// Edit class submit
exports.editClassSubmit = function(req,res,next){

	if( req.body && req.body.id ){
	
		var params = {
			id: req.body.id,
			teacher: req.body.teacher,
			year: req.body.year,
			name: req.body.name
		};
		if( params.id && params.teacher && params.year && params.name ){			
			db.editClass( params.id, params.name, params.year, params.teacher, function(err, editedClass){
				if(err){
					req.flash(config.flashMessage, err.message);
					res.redirect('/admin/classes/edit/?id='+params.id);
				}else{
					req.flash(config.flashMessage, "Successfully saved");
					res.redirect('/admin/classes/edit/?id='+params.id);
				}
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect('/admin/classes/edit/?id='+params.id);
		}		
	} else{
		next();
	}
};

// Delete Class
exports.deleteClass = function(req,res,next){
	if (req.query && req.query.id){
		db.findClassbyId( req.query.id, function(err, theClass){
			if( err ){
				next();
			} else{
				res.render('admin/classdelete', { id: theClass.id,
												  name: theClass.name });
			}
		} );
	} else{
		next();
	}
};

exports.deleteClassSubmit = function(req,res){
	if ( req.body && req.body.id ){
		db.deleteClass( req.body.id, function(err){
			if( err ){
				next();
			} else{
				res.render('admin/classdeleted');
			}
		} );
	} else{
		next();
	}
};



exports.cleanup = function(req,res){
	res.render('admin/cleanup');
};


exports.cleanupSubmit = function(req,res,next){
console.log("here");
	if(req.body && req.body.forsure){
		db.cleanupEmptyUsers( function(err){
			if ( err ){
				res.send( err.message );
			}else{
				res.render("admin/cleanedup");
			}
		});
	}
};




///////// TESTS ///////////
exports.test = function(req,res){

	db.createStudents( 80, "oranges", "9mm", function(err, tokens){
		res.send( tokens );
	} );
	
};

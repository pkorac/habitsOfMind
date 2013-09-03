var db = require('../db'),
	config = require('../config'),
	util = require('util');


// LANDING
exports.landing = function( req, res ){
	res.render('admin/landing', { title: req.session.username,
								  subtitle: "How do you feel today?",
								  habits: config.habits });
};

/*
exports.history = function( req, res ){
	res.render('admin/history', { title: req.session.username,
								  subtitle: "History of my habits" });
};
*/

exports.admin = function(req,res,next){
	res.render('admin/admin', { title: req.session.username, subtitle: "Administrative options" } );
}


exports.editProfile = function(req,res,next){
	db.findUserbyName( req.session.username, function(err, user){
		if( err ) {
			next();
		}else{	
			
			res.render('admin/edit', {  title: "Edit profile",
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



/////////////////////////////////////////////
// USERS
exports.listUsers = function( req, res ){
	db.listUsers( function(err, users){
		if (err ) {
			//console.log( err );
			next();
		} else{
			res.render('admin/userslist', { title: "Users",
											subtitle: null,
											users: users } );
		}
	} );
};

// Create User Page
exports.createUser = function(req,res, next){

	db.listGroups( function(err, groups){
		if ( err ) {
			next();
		} else{
			res.render( 'admin/usercreate', { title: "Add a new user",
												subtitle: null,
												allTypes: config.userTypes, 
												defaultType: config.defaultUserType,
												defaultSecret: config.defaultUserSecret,
												genders: config.genders,
												groups: groups } );	
		}		
	});

};

// Craete User Submit
exports.createUserSubmit = function(req,res,next){
	
	if ( req.body ){

		var params = {
			secret: req.body.secret,
			type: req.body.usertype,
			gender: req.body.gender,
			habitsGroup: req.body.groupid
		};
		
		if (params.secret && params.type && params.gender && params.habitsGroup){
			
			// Create the user
			db.createUser( params, function(err, newUser, token){
			
				if( err ){
					next();
				} else{
					//console.log( util.inspect( newUser, {colors: true} ) );
					res.render('admin/usercreated', { title: "User created", subtitle: null, secret: params.secret, token: token });
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
			if( err ) {
				//console.log( err );
				next();
			} else if( user ) {
			
				db.listGroups( function(err, groups){
					if( err ){
						next();
					} else{
						res.render( 'admin/useredit', { 
							title: "Edit user",
							subtitle: null,
							username: user.name,
							usertype: user.type,
							email: user.email || "",
							habitsGroup: user.habitsGroup,
							groups: groups,
							id: user._id,
							allTypes: config.userTypes,
							genders: config.genders,
							gender: user.gender,
							messageSuccess: req.flash(config.flashMessageSuccess),
							messageError: req.flash(config.flashMessage)
						} );	

					}		
				});
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
		console.log("get here");
	if( req.body ){
	
		var edit = {
			_id: req.body.id,
			email: req.body.email,
			habitsGroup: req.body.habitsGroup,
			type: req.body.usertype,
			password: req.body.password,
			gender: req.body.gender
		};
		if ( edit.password.length < 1 )edit.password = null;	
	
		db.editUser( edit._id, edit, function(err, user){		
			if( user ){
				req.flash(config.flashMessageSuccess, "Saved");
				res.redirect(req.path+"?id="+user._id);
			}else if( err ){
				next();
			}else {

				next();
			}
		} );
	}else{
		console.log("no body");
		next();		
	}
};

// Delete user Page
exports.deleteUser = function(req,res, next){

	if ( req.query ){
		var id = req.query.id;
		var username = req.query.username;
		if( id && username ){	

			res.render( 'admin/userdelete', { title: "Delete user", subtitle: null, id: id, username: username } );				
		} else{
			console.log("fuck me");
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
				res.render('admin/userdeleted', { title: "User deleted", subtitle: null, username: username});
			} else{
				next();
			}
		} );		
	} else {
		next();
	}

};




/////////////////////////////////////////////
// GROUPS
exports.listGroups = function(req,res,next){
	db.listGroups( function(err, groups){
		if(err){ 
			next(); 
			return;
		}
		res.render('admin/grouplist', { title: "Groups",
										subtitle: null,
										groups: groups });		
	} );
};

// Create group
exports.createGroup = function(req,res,next){
	res.render('admin/groupcreate', { title: "New group", subtitle: null,
									  year: config.defaultYear, 
									  message: req.flash(config.flashMessage) });
};

// Create Group submit
exports.createGroupSubmit = function(req,res,next){
	if( req.body ){
	
		var name = req.body.habitsGroup;
		var year = parseInt( req.body.year );
		var teacher = req.body.teacher;
		
		if ( name && year && teacher ){
			
			// Create the group		
			db.createGroup( name, year, teacher, function(err, newGroup){
				if ( err ) {
					req.flash(config.flashMessage,err.message );
					res.redirect(req.path);
					return;
				} else{
					// all good let's populate it with users now
					res.render('admin/groupcreated', { title: "Group created", subtitle: null, id: newGroup._id });
				}
			} );						
			
		} else{
			req.flash(config.flashMessage, "All fields must be filled out");
			res.redirect( req.path );
		}		
	} else{
		req.flash(config.flashMessage, "All fields must be filled out");
		res.redirect( req.path );
	}
};

// Populate a group
exports.populate = function(req,res){
	var id = null;
	if ( req.query && req.query.id) id = req.query.id;
	db.listGroups( function(err, groups){
		if ( err ){
			next();
		}{
			res.render('admin/grouppopulate', { title: "Populate group", subtitle: null,
												groups: groups, 
												defaultSecret: config.defaultUserSecret,
												message: req.flash(config.flashMessage),
												id: id} );
		}
	} );
};

// Populate group submit
exports.populateSubmit = function(req,res,next){
	if( req.body ){
		
		var groupid = req.body.groupid;
		var secret = req.body.secret;
		var boys = req.body.howManyBoys || 0;
		var girls = req.body.howManyGirls || 0;
		
		if( groupid && secret && (boys+girls > 0) ){
			
			// ADD BOYS
			db.createUsers( boys, secret, groupid, config.genders[0], function(err, boyTokens){
				// Boy issues
				if( err ){
					req.flash(config.flashMessage, err.message );
					res.redirect(req.path);
				} else{

					// ADD GIRLS		
					db.createUsers( girls, secret, groupid, config.genders[1], function(err, girlTokens){
						// Girl issues
						if( err ){
							req.flash(config.flashMessage, err.message );
							res.redirect(req.path);
						} else{

							// all good
							res.render( 'admin/grouppopulated', { title: "Group populated", subtitle: null,
																  boyTokens: boyTokens, 
																  girlTokens: girlTokens, 
																  secret: secret } );
						}
						
					} );
				}
				
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect(req.path);
		}
	} else{
		req.flash(config.flashMessage, "All the fields must be filled out");
		res.redirect(req.path);
	} 
};

// Edit group page
exports.editGroup = function(req,res,next){
	
	if( req.query ){
	
		var id = req.query.id;
	
		if ( id ){
			db.findGroupbyId( id, function(err, habitsGroup){				
				//console.log( util.inspect( habitsGroup, {colors: true} ) );
				if ( err ){
					next();
					return;
				} else{
					res.render('admin/groupedit', { title: "Edit group", subtitle: null,
													messageSuccess: req.flash(config.flashMessageSuccess),
													messageError: req.flash(config.flashMessage),
													teacher: habitsGroup.teacher,
													year: habitsGroup.year,
													name: habitsGroup.name,
													id: habitsGroup._id});
	
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

// Edit group submit
exports.editGroupSubmit = function(req,res,next){

	if( req.body && req.body.id ){
	
		var params = {
			id: req.body.id,
			teacher: req.body.teacher,
			year: req.body.year,
			name: req.body.name
		};
		if( params.id && params.teacher && params.year && params.name ){			
			db.editGroup( params.id, params.name, params.year, params.teacher, function(err, editedGroup){
				if(err){
					req.flash(config.flashMessage, err.message);
					res.redirect(req.path+'?id='+params.id);
				}else{
					req.flash(config.flashMessageSuccess, "Successfully saved");
					res.redirect(req.path+'?id='+params.id);
				}
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect(req.path+'?id='+params.id);
		}		
	} else{
		next();
	}
};

// Delete Group
exports.deleteGroup = function(req,res,next){
	if (req.query && req.query.id){
		db.findGroupbyId( req.query.id, function(err, theGroup){
			if( err ){
				next();
			} else{
				res.render('admin/groupdelete', {   title: "Delete group", subtitle: null,
													id: theGroup._id,
													name: theGroup.name });
			}
		} );
	} else{
		next();
	}
};

exports.deleteGroupSubmit = function(req,res){
	if ( req.body && req.body.id ){
		db.deleteGroup( req.body.id, function(err){
			if( err ){
				next();
			} else{
				res.render('admin/groupdeleted', {title: "Group deleted", subtitle: null});
			}
		} );
	} else{
		next();
	}
};



exports.cleanup = function(req,res){
	res.render('admin/cleanup', {title: "Cleanup", subtitle: null});
};


exports.cleanupSubmit = function(req,res,next){
	if(req.body && req.body.forsure){
		db.cleanupEmptyUsers( function(err){
			if ( err ){
				res.render("admin/cleanedupnot", { title: "Cleanup complete", subtitle: null});
			}else{
				res.render("admin/cleanedup", { title: "Cleanup complete", subtitle: null});
			}
		});
	}
};




///////// TESTS ///////////
exports.test = function(req,res){

	db.createUsers( 80, "oranges", "9mm", function(err, tokens){
		res.send( tokens );
	} );
	
};

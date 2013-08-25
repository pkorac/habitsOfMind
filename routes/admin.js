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

	db.listGroups( function(err, groups){
		if ( err ) {
			next();
		} else{
			res.render( 'admin/usercreate', { allTypes: config.userTypes, 
										defaultType: config.defaultUserType,
										defaultSecret: config.defaultUserSecret,
										genders: config.genders,
										groups: groups } );	
		}		
	});

};

// Craete User Submit
exports.createUserSubmit = function(req,res){
	
	if ( req.body ){

		var params = {
			secret: req.body.secret,
			type: req.body.usertype,
			gender: req.body.gender,
			groupid: req.body.groupid
		};
		
		if (params.secret && params.type && params.gender && params.groupid){
			
			// Create the user
			db.createUser( params, function(err, newUser, token){
				if( err ){
					next();
				} else{
					//console.log( util.inspect( newUser, {colors: true} ) );
					res.render('admin/usercreated', { secret: params.secret, token: token });
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
						habitsGroup: user.habitsGroup,
						id: user._id,
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
			habitsGroup: req.body.habitsGroup,
			type: req.body.usertype,
			password: req.body.password,
			gender: req.body.gender
		};
		if ( edit.password.length < 1 )edit.password = null;	
	
		db.editUser( edit.id, edit, function(err, user){

			if( user ){
				res.redirect("/admin/users/edit/?id="+user._id);
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
// GROUPS
exports.listGroups = function(req,res,next){
	db.listGroups( function(err, groups){
		if(err){ 
			next(); 
			return;
		}
		res.render('admin/grouplist', { groups: groups });		
	} );
};

// Create group
exports.createGroup = function(req,res,next){
	res.render('admin/groupcreate', { year: config.defaultYear, message: req.flash(config.flashMessage) });
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
					res.redirect('/admin/groups/create');
					return;
				} else{
					// all good let's populate it with users now
					res.render('admin/groupcreated', { id: newGroup._id });
				}
			} );						
			
		} else{
			req.flash(config.flashMessage, "All fields must be filled out");
			res.redirect( '/admin/groups/create');
		}		
	} else{
		req.flash(config.flashMessage, "All fields must be filled out");
		res.redirect( '/admin/groups/create');
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
			res.render('admin/grouppopulate', { groups: groups, 
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
					res.redirect('/admin/groups/populate');
				} else{

					// ADD GIRLS		
					db.createUsers( girls, secret, groupid, config.genders[1], function(err, girlTokens){
						// Girl issues
						if( err ){
							req.flash(config.flashMessage, err.message );
							res.redirect('/admin/groups/populate');
						} else{

							// all good
							res.render( 'admin/grouppopulated', { boyTokens: boyTokens, girlTokens: girlTokens, secret: secret } );
						}
						
					} );
				}
				
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect('/admin/groups/populate');			
		}
	} else{
		req.flash(config.flashMessage, "All the fields must be filled out");
		res.redirect('/admin/groups/populate');		
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
					res.render('admin/groupedit', { message: req.flash(config.flashMessage),	
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
					res.redirect('/admin/groups/edit/?id='+params.id);
				}else{
					req.flash(config.flashMessage, "Successfully saved");
					res.redirect('/admin/groups/edit/?id='+params.id);
				}
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect('/admin/groups/edit/?id='+params.id);
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
				res.render('admin/groupdelete', { id: theGroup._id,
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
				res.render('admin/groupdeleted');
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

	db.createUsers( 80, "oranges", "9mm", function(err, tokens){
		res.send( tokens );
	} );
	
};

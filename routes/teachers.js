var db = require('../db'),
	util = require('util'),
	config = require('../config');

exports.landing = function( req, res ){
	res.render('teachers/landing', { title: req.session.username,
								  subtitle: "How do you feel today?",
								  habits: config.habits });
};

exports.admin = function(req,res,next){
	res.render('teachers/admin', { title: req.session.username, subtitle: "Administrative options" } );
}


exports.editProfile = function(req,res,next){
	db.findUserbyName( req.session.username, function(err, user){
		if( err ) {
			next();
		}else{	
			
			res.render('teachers/edit', {  title: "Edit profile",
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
// GROUPS
exports.listGroups = function(req,res,next){
	db.listGroups( function(err, groups){
		if(err){ 
			next(); 
			return;
		}
		res.render('teachers/grouplist', { title: "Groups",
										subtitle: null,
										groups: groups });		
	} );
};

// Create group
exports.createGroup = function(req,res,next){
	res.render('teachers/groupcreate', { title: "New group", subtitle: null,
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
					res.render('teachers/groupcreated', { title: "Group created", subtitle: null, id: newGroup._id });
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
			res.render('teachers/grouppopulate', { title: "Populate group", subtitle: null,
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
							res.render( 'teachers/grouppopulated', { title: "Group populated", subtitle: null,
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
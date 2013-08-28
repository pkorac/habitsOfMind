var db = require('../db'),
	util = require('util'),
	config = require('../config');

exports.landing = function(req,res){
	res.render('teachers/landing', { title: "Teachers area" } );
};


exports.listGroups = function(req,res,next){
	db.listGroups( function(err, groups){
		if(err){ 
			next(); 
			return;
		}
		res.render('teachers/grouplist', { groups: groups });		
	} );
};

// Create group
exports.createGroup = function(req,res,next){
	res.render('teachers/groupcreate', { year: config.defaultYear, message: req.flash(config.flashMessage) });
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
					res.redirect('/teachers/groups/create');
					return;
				} else{
					// all good let's populate it with users now
					res.render('teachers/groupcreated', { id: newGroup._id });
				}
			} );						
			
		} else{
			req.flash(config.flashMessage, "All fields must be filled out");
			res.redirect( '/teachers/groups/create');
		}		
	} else{
		req.flash(config.flashMessage, "All fields must be filled out");
		res.redirect( '/teachers/groups/create');
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
			res.render('teachers/grouppopulate', { groups: groups, 
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
					res.redirect('/teachers/groups/populate');
				} else{

					// ADD GIRLS		
					db.createUsers( girls, secret, groupid, config.genders[1], function(err, girlTokens){
						// Girl issues
						if( err ){
							req.flash(config.flashMessage, err.message );
							res.redirect('/teachers/groups/populate');
						} else{

							// all good
							res.render( 'teachers/grouppopulated', { boyTokens: boyTokens, girlTokens: girlTokens, secret: secret } );
						}
						
					} );
				}
				
			} );
		} else{
			req.flash(config.flashMessage, "All the fields must be filled out");
			res.redirect('/teachers/groups/populate');			
		}
	} else{
		req.flash(config.flashMessage, "All the fields must be filled out");
		res.redirect('/teachers/groups/populate');		
	} 
};

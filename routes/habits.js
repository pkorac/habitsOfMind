var config = require('../config'),
	db = require('../db'),
	util = require('util');

// LIST HABITS
exports.habitsList = function(req,res,next){
	res.render( 'habits/habitsList', {  title: req.session.username, 
											subtitle: "Edit my Habits",
											habits: config.habits });
};

// EDIT HABIT
exports.editHabit = function(req, res, next){
	if ( req.query && req.query.habit ){
		for ( var habit in config.habits ){
			
			if ( habit === req.query.habit ){
				res.render( 'habits/editHabit', {   title: config.habits[habit].name, 
													subtitle: null,
													habitid: habit,
													habit: config.habits[habit] } );
				return;
			}
		}
	} else{				
		res.redirect( "../"+req.path );
	}
}

// EDIT HABIT SUBMIT
exports.editHabitSubmit = function( req, res, next){
	if( req.body && req.body.habit ){
		
		var params = {
			subhabits: [parseFloat(req.body._0), parseFloat(req.body._1), parseFloat(req.body._2)],
			user: req.session.username,
			group: null,
			habit: req.body.habit
		};		

		db.findUserbyName( params.user, function(err, theUser){
			if( err ){
				next();
			} else{
								
				params.group = theUser.habitsGroup;
				
				db.saveHabit( params, function(err, data){
					if( err ){
						console.log( err );
						next();
					} else{
						for( var habit in config.habits ){
							if ( habit === req.query.habit ){
								res.render( 'habits/editedHabit', {   title: config.habits[habit].name, 
																	subtitle: "Thank you",
																	habitid: habit,
																	habit: config.habits[habit] } );
							}
						}

					}
				} );
			}
		} );
	} else{
		next();
	}
};

// HABITS HISTORY
exports.history = function(req, res, next){	
	// 
	var habits = {};
	
	// Get yearly
	db.habitsByUser( req.session.username, "THISYEAR", function(err, yeardata){
		if ( err ){
			console.log(err);
			next();
		} else{
			
			habits.year = yeardata;

			// Get monthly
			db.habitsByUser( req.session.username, "THISMONTH", function(err, monthdata){
				if( err ){
					console.log( err );
					next();
				} else{
				
					habits.month = monthdata;
					
					
					// Get weekly
					db.habitsByUser( req.session.username, "THISWEEK", function(err, weekdata){
						if( err ){
							console.log( err );
							next();
						} else{
							
							
							habits.week = weekdata;						

							res.render('habits/history', {  title: req.session.username,
															subtitle: "My habits history",
															habits: habits });
							
							
						}
					});
										
				}
			
			});
		}

	} );	
};









// Have fun
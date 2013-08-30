var config = require('../config'),
	db = require('../db'),
	util = require('util');

// LIST HABITS
exports.habitsList = function(req,res,next){
	res.render( 'habits/habitsList', {  title: req.session.username, 
											subtitle: "My Habits",
											habits: config.habits });
};

// EDIT HABIT
exports.editHabit = function(req, res, next){
	if ( req.query && req.query.habit ){
		config.habits.forEach( function(habit){
			
			if ( habit.habit === req.query.habit ){
				res.render( 'habits/editHabit', {   title: habit.name, 
													subtitle: null,
													habit: habit } );
				return;
			}			
			
		} );
	} else{				
		res.redirect( "../"+req.path );
	}
}

// EDIT HABIT SUBMIT
exports.editHabitSubmit = function( req, res, next){
	if( req.body && req.body.habit ){
		
		var params = {
			subhabits: [req.body._0, req.body._1, req.body._2],
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
						config.habits.forEach( function(habit){
							if ( habit.habit === req.query.habit ){
								res.render( 'habits/editedHabit', {   title: habit.name, 
																	subtitle: "Thank you",
																	habit: habit } );
							}
						} );						

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
	
		db.habitsByUser( req.session.username, function(err, habits){
			if(err){
				next();
			} else{
				
				console.log( util.inspect( habits, {colors: true, depth: 10} ) );
				res.render('habits/history', { title: req.session.username, 
												subtitle: "My habits history",
												habits: habits.rows,
												allHabits: config.habits });	
				
			}
		} );
};









// Have fun
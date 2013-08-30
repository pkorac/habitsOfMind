var config = require('../config'), util = require('util');

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

	console.log( util.inspect( req.body, {colors: true} ) );	
	if( req.body ){
		config.habits.forEach( function(habit){
			
			if ( habit.habit === req.body.habit ){
				res.render('habits/editedHabit', {  title: "Saved", 
												subtitle: null,
												habit: habit });
			}
		} );
		
	} else{
		next();
	}
};

// HABITS HISTORY
exports.habitsHistory = function(req, res, next){
		
};
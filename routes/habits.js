var config = require('../config'), util = require('util');

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
		res.render( 'habits/habitsList', {  title: req.session.username, 
											subtitle: "My Habits",
											habits: config.habits });
	}
}

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
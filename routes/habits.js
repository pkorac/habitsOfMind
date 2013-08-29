var config = require('../config');

exports.editHabit = function(req, res, next){
	if ( req.query && req.query.habit ){
		for( var i = 0; i < config.habits.length; i++ ){
			if ( config.habits[i] === req.query.habit ){
				console.log( "Got here" );
				res.render( 'habits/editHabit', {   title: "Edit habit", 
													subtitle: null,
													habit: req.query.habit } );
				return;
			}
		} 		
	} else{
		res.render( 'habits/habitsList', {  title: req.session.username, 
											subtitle: "My Habits",
											habits: config.habits });
	}
}
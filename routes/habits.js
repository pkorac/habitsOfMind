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
	
		db.habitsByUser( req.session.username, 5, function(err, data){
		
			if(err){
				if ( err ) console.log( err );
				next();
			} else{

				console.log( util.inspect( data, {colors: true, depth: 10} ) );				
				var habits = []; // has a name and a record


				for( var i = 0; i < data.rows.length; i++ ){
					// A record
					var record = {  date: data.rows[i].key[2], 
									subhabits: data.rows[i].value.subhabits,
									allvalues: data.rows[i].value.all };
					
					if( i == 0 ){
						// Push the first habit and record in
						habits.push( {  habitid: data.rows[i].key[1], 
										records: [record] });
					} else if( i > 0 && habits[i-1].habitid !== data.rows[i].key[1] ){
						// Push new habit
						habits.push( {  habitid: data.rows[i].key[1], 
										records: [record] } );
					} else {
						// Push new record into the last habit in the array
						habits[habits.length-1].records.push( record );
					}
				}

				res.render('habits/history', { title: req.session.username, 
												subtitle: "My habits history",
												habits: habits,
												allHabits: config.habits } );		
			}
		} );
};









// Have fun
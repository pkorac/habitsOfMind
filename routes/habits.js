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
	
		db.habitsByUser( req.session.username, 8, function(err, data){
		
			if(err){
				if ( err ) console.log( err );
				next();
			} else{

				
				var habits = []; // has an id and a record

				for( var i = 0; i < data.rows.length; i++ ){
						var slicedKey = data.rows[i].key.slice(2);
						var date = new Date( slicedKey[0], slicedKey[1], slicedKey[2], slicedKey[3], slicedKey[4] );
						
						var record = {  date: date, 
										value: data.rows[i].value.sum/data.rows[i].value.count,
										max: data.rows[i].value.max,
										min: data.rows[i].value.min };


						if( i == 0 ){
							// Push the first habit and record in
							habits.push( { id: data.rows[i].key[1], records: [ record ] } );
						} else if( i > 0 && habits[habits.length-1].id !== data.rows[i].key[1] ){
							// Push new habit
							habits.push( { id: data.rows[i].key[1], records: [ record ] } );
						} else {
							// Push new record into the last habit in the array
							habits[habits.length-1].records.push( record );
						}
				}
				
				
				res.render('habits/history', {  title: "My habits history",
												subtitle: null,
												habits: habits
				} );
				
			}
		} );
};









// Have fun
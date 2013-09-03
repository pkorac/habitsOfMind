var db = require('../db'),
	util = require('util'),
	config = require('../config');

exports.landing = function(req,res,next){
	// Show the group's habits
	if ( req.query && req.query.groupid ){

		groupHistory(req,res,next);

	// Display a list of groups	
	} else{	
		db.listGroups( function(err, groups){

			res.render( 'groups/landing', { 
					title: "Tutor groups",
					subtitle: "And their habits of mind",
					groups: groups 
				});
		} );
		
	}

};


function groupHistory(req,res,next){

	var groupid = req.query.groupid;
	// Get detail
	db.habitsByGroup( groupid, 8, function(err, data){
	
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
			
			// Get Average
			db.habitsByGroup( groupid, 2, function(err, data){
				if ( err ){
					console.log( err );
					next();
				} else{
				
//					console.log( util.inspect( data, {colors: true, depth: 10} ) );
					var habitsAverages = [];
					for( var i = 0; i < data.rows.length; i++ ){
						habitsAverages.push( { habit: data.rows[i].key[1],
											   habitName: config.habits[data.rows[i].key[1]].name,
											  value: data.rows[i].value.sum/data.rows[i].value.count } );
					}
					
					db.findGroupbyId( groupid, function(err, group){
						res.render('habits/groupHistory', {  title: group.name,
														subtitle: group.teacher + ", Year: " +group.year,
														teacher: group.teacher,
														habits: habits,
														habitsAverages: habitsAverages
						} );							
					} );
				}
			});				
		}
	} );
}
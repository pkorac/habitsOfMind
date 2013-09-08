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
					subtitle: "Our habits",
					groups: groups 
				});
		} );
		
	}

};


function groupHistory(req,res,next){

	var groupid = req.query.groupid;
	console.log( groupid );
	
	db.findGroupbyId( groupid, function(err, group){
		
		if(err){
			console.log(err);
			next();			
		} else{
			
			// Get detail
			var habits = {};
			
			// Get yearly
			db.habitsByGroup( groupid, "THISYEAR", function(err, yeardata){
				if ( err ){
					console.log(err);
					next();
				} else{
					
					habits.year = yeardata;
		
					// Get monthly
					db.habitsByGroup( groupid, "THISMONTH", function(err, monthdata){
						if( err ){
							console.log( err );
							next();
						} else{
						
							habits.month = monthdata;
							
							
							// Get weekly
							db.habitsByGroup( groupid, "THISWEEK", function(err, weekdata){
								if( err ){
									console.log( err );
									next();
								} else{
									
									
									habits.week = weekdata;						
											
									res.render('habits/groupHistory', {  title: group.name,
																		subtitle: group.teacher + ", Year: " +group.year,
																		teacher: group.teacher,
																		habits: habits });
								}
							});
												
						}
					
					});
				}
		
			} );	
			
		}
	} );

}

var db = require('../db');

exports.landing = function(req,res){

	db.listGroups( function(err, groups){
		res.render( 'groups/landing', { 
				title: "Tutor groups",
				subtitle: "And their habits of mind",
				groups: groups 
			});
	} );

};
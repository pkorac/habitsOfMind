var db = require('../db');

exports.landing = function(req,res){
	db.listGroups( function(err, groups){
		res.render( 'groups/landing', { 
				title: "Groups listing",
				groups: groups 
			});
	} );
};
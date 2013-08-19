var db = require('../db');

exports.landing = function(req,res){
	db.listClasses( function(err, classes){
		res.render( 'classes/landing', { 
				title: "Classes listing",
				classes: classes 
			});
	} );
};


exports.landing = function(req,res){
	res.render('teachers/landing', { title: "Teacher authenticated" } );
};


exports.landing = function(req,res){
	res.render('students/landing', { title: "Students authenticated" } );
};
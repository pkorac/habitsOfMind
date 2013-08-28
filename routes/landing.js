/*

Landing Page


*/

exports.landing = function(req, res){
	res.render('landing', { title: "Habits of mind",
							subtitle: "A  web-app about learning habits instead of grades" } );
}

exports.about = function(req,res){
	res.render('about', { title: "About",
						  subtitle: null } );
};

exports.contact = function(req,res){
	res.render('contact', { title: "Contact",
							subtitle: null } );
};
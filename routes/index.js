
// Landing page
var landing = require('./landing'),
	login = require('./login'),
	logout = require('./logout'),
	students = require('./students'),
	teachers = require('./teachers'),
	admin = require('./admin'),
	lost = require('./lost'),
	denied = require('./denied');


module.exports = function(app, config, auth){

	// GET ////////
	
	// Landing page
	app.get('/', landing );
	
	// Log in and out
	app.get( config.loginRoute, login );
	app.get('/logout', auth.logout, logout );
	
	// Students and teachers
	app.get('/students', auth.check, students.landing );
	app.get('/teachers', auth.check, teachers.landing );
	
	// Admin
	app.get('/admin', auth.check, admin.landing );
	app.get('/admin/users', auth.check, admin.users );
	app.get('/admin/adduser', auth.check, function(req,res){
		console.log( config.userTypes );
		res.render( 'admin/adduser', { types: config.userTypes } );
	} );

	// POST ////////
	
	// Login
	app.post( config.loginRoute, auth.login, function(req, res){
		res.send("Logged in");
	} );


	// OTHER ////////
		
	// Denied
	app.get( config.deniedRoute, denied );
	
	// Lost - 404
	app.all('*', lost );

};
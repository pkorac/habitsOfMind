
// Landing page
var indexlanding = require('./index-landing'),
	login = require('./login'),
	logout = require('./logout'),
	students = require('./students'),
	teachers = require('./teachers'),
	admin = require('./admin'),
	lost = require('./lost'),
	denied = require('./denied');


module.exports = function(app, config, auth){
	
	// Landing page
	app.get('/', indexlanding );
	
	// Log in and out
	app.get( config.loginRoute, login.login );
	app.post( config.loginRoute, auth.login, login.loginsuccess); // post
	app.get('/logout', auth.logout, login.logout );
	
	// Students and teachers
	app.get('/students', auth.check, students.landing );
	app.get('/teachers', auth.check, teachers.landing );
	
	// Admin
	app.get('/admin', auth.check, admin.landing );

	app.get('/admin/users', auth.check, admin.listusers );
	app.get('/admin/users/new', auth.check, admin.newuser );
	app.post('/admin/users/new', auth.check, admin.adduser ); // post
	app.get('/admin/users/created', auth.check, admin.usercreated );

	app.get('/admin/classes', auth.check, admin.listclasses );
	app.get('/admin/classes/new', auth.check, admin.newclass );
	app.post('/admin/classes/new', auth.check, admin.addclass ); // post
	app.get('/admin/classes/created', auth.check, admin.classcreated );
	app.get('/admin/classes/populate', auth.check, admin.newpopulation );
	app.post('/admin/classes/populate', auth.check, admin.populateclass ); // post
	app.get('/admin/classes/populated', auth.check, admin.classpopulated );
		
		
	app.get('/admin/test', auth.check, admin.test );

	// OTHER ////////
		
	// Denied
	app.get( config.deniedRoute, denied );
	
	// Lost - 404
	app.all('*', lost );

};
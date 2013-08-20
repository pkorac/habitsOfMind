
// Landing page
var landing = require('./landing'),
	login = require('./login'),
	students = require('./students'),	
	teachers = require('./teachers'),
	classes = require('./classes'),
	admin = require('./admin'),
	lost = require('./lost'),
	denied = require('./denied');


module.exports = function(app, config, auth){
	
	// Landing page
	app.get('/', landing.landing );
	app.get('/about', landing.about );
	app.get('/contact', landing.contact );
	
	// Log in and out
	app.get( config.loginRoute, login.login );
	app.post( config.loginRoute, auth.login, login.loginSuccess); // post
	app.get('/logout', auth.logout, login.logout );
	
	app.get('/register', login.register );
	app.post('/register', login.registerSubmit ); // post
	app.post('/register/details', login.registerDetails ); // post

	
	// Students and teachers
	app.get('/students/', auth.check, students.landing );
	app.post('/students/landing', auth.check, students.editProfileSubmit ); // post
	app.get('/teachers/', auth.check, teachers.landing );
	
	// Classes
	app.get('/classes/', classes.landing);
		
	// Admin
	app.get('/admin/', auth.check, admin.landing );

	app.get('/admin/users/', auth.check, admin.listUsers );
	
	app.get('/admin/users/create', auth.check, admin.createUser );
	app.post('/admin/users/create', auth.check, admin.createUserSubmit ); // post
	
	app.get('/admin/users/edit', auth.check, admin.editUser );
	app.post('/admin/users/edit', auth.check, admin.editUserSubmit ); // post
	
	app.get('/admin/users/delete', auth.check, admin.deleteUser );
	app.post('/admin/users/delete', auth.check, admin.deleteUserSubmit ); // post



	app.get('/admin/classes/', auth.check, admin.listClasses );
	
	app.get('/admin/classes/create', auth.check, admin.createClass );
	app.post('/admin/classes/create', auth.check, admin.createClassSubmit ); // post
	
	app.get('/admin/classes/populate', auth.check, admin.populate );
	app.post('/admin/classes/populate', auth.check, admin.populateSubmit ); // post
	
	app.get('/admin/classes/edit', auth.check, admin.editClass );
	app.post('/admin/classes/edit', auth.check, admin.editClassSubmit ); // post	
	
	app.get('/admin/classes/delete', auth.check, admin.deleteClass );
	app.post('/admin/classes/delete', auth.check, admin.deleteClassSubmit ); // post

	app.get('/admin/cleanup', auth.check, admin.cleanup );
	app.post('/admin/cleanup', auth.check, admin.cleanupSubmit ); // post

	app.get('/admin/test', auth.check, admin.test );

	// OTHER ////////
		
	// Denied
	app.get( config.deniedRoute, denied );
	
	// Lost - 404
	app.all('*', lost );

};
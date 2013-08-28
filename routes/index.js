
// Landing page
var landing = require('./landing'),
	login = require('./login'),
	students = require('./students'),	
	teachers = require('./teachers'),
	groups = require('./groups'),
	admin = require('./admin'),
	lost = require('./lost'),
	denied = require('./denied');


module.exports = function(app, config, auth){
	
	////////////////////////////////////////////////////////////////////////////////
	// Landing page
	app.get('/', landing.landing );
	app.get('/about', landing.about );
	app.get('/contact', landing.contact );
	
	////////////////////////////////////////////////////////////////////////////////
	// Log in, out and register
	app.get( config.loginRoute, login.login );
	app.post( config.loginRoute, auth.login, login.loginSuccess); // post
	app.get('/logout', auth.logout, login.logout );
	
	app.get('/register', login.register );
	app.post('/register', login.registerSubmit ); // post
	app.post('/register/details', login.registerDetails ); // post
	

	////////////////////////////////////////////////////////////////////////////////	
	// Students
	app.get('/students/', auth.check, students.landing );
	app.get('/students/history', auth.check, students.history );
	app.get('/students/edit', auth.check, students.editProfile );
	app.post('/students/edit', auth.check, students.editProfileSubmit ); // post


	////////////////////////////////////////////////////////////////////////////////	
	// Groups
	app.get('/groups', groups.landing);

	
	////////////////////////////////////////////////////////////////////////////////
	// Teachers
	app.get('/teachers/', auth.check, teachers.landing );
	app.get('/teachers/groups/', auth.check, teachers.listGroups );
	
	app.get('/teachers/groups/create', auth.check, teachers.createGroup );
	app.post('/teachers/groups/create', auth.check, teachers.createGroupSubmit ); // post
	
	app.get('/teachers/groups/populate', auth.check, teachers.populate );
	app.post('/teachers/groups/populate', auth.check, teachers.populateSubmit ); // post	

	
	////////////////////////////////////////////////////////////////////////////////
	// Admin
	app.get('/admin/', auth.check, admin.landing );
	app.get('/admin/history', auth.check, admin.history );
	app.get('/admin/admin', auth.check, admin.admin );
	app.get('/admin/edit', auth.check, admin.editProfile );
	app.post('/students/edit', auth.check, admin.editProfileSubmit ); // post



	app.get('/admin/users/', auth.check, admin.listUsers );
	
	app.get('/admin/users/create', auth.check, admin.createUser );
	app.post('/admin/users/create', auth.check, admin.createUserSubmit ); // post
	
	app.get('/admin/users/edit', auth.check, admin.editUser );
	app.post('/admin/users/edit', auth.check, admin.editUserSubmit ); // post
	
	app.get('/admin/users/delete', auth.check, admin.deleteUser );
	app.post('/admin/users/delete', auth.check, admin.deleteUserSubmit ); // post

	
	app.get('/admin/groups/', auth.check, admin.listGroups );
	
	app.get('/admin/groups/create', auth.check, admin.createGroup );
	app.post('/admin/groups/create', auth.check, admin.createGroupSubmit ); // post
	
	app.get('/admin/groups/populate', auth.check, admin.populate );
	app.post('/admin/groups/populate', auth.check, admin.populateSubmit ); // post
	
	app.get('/admin/groups/edit', auth.check, admin.editGroup );
	app.post('/admin/groups/edit', auth.check, admin.editGroupSubmit ); // post	
	
	app.get('/admin/groups/delete', auth.check, admin.deleteGroup );
	app.post('/admin/groups/delete', auth.check, admin.deleteGroupSubmit ); // post

	app.get('/admin/cleanup', auth.check, admin.cleanup );
	app.post('/admin/cleanup', auth.check, admin.cleanupSubmit ); // post

	app.get('/admin/test', auth.check, admin.test );
	

	////////////////////////////////////////////////////////////////////////////////
	// Other
		
	// Denied
	app.get( config.deniedRoute, denied );
	
	// Lost - 404
	app.all('*', lost );

};

// Landing page
var landing = require('./landing'),
	login = require('./login'),
	students = require('./students'),	
	teachers = require('./teachers'),
	groups = require('./groups'),
	habits = require('./habits'),
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
//	app.get('/students/', auth.check, students.landing );
	app.get('/students/', auth.check, function(req,res){
		res.redirect('/students/habits/');
	} );		
	app.get('/students/habits', auth.check, habits.habitsList );
	app.get('/students/habits/edit', auth.check, habits.editHabit );
	app.post('/students/habits/edit', auth.check, habits.editHabitSubmit ); // post
	app.get('/students/history', auth.check, habits.history );
	
	app.get('/students/edit', auth.check, admin.editProfile );	
	app.post('/students/edit', auth.check, admin.editProfileSubmit ); // post



	////////////////////////////////////////////////////////////////////////////////	
	// Groups
	app.get('/groups', groups.landing);

	
	////////////////////////////////////////////////////////////////////////////////
	// Teachers
//	app.get('/teachers/', auth.check, teachers.landing );
	app.get('/teachers/', auth.check, function(req,res){
		res.redirect('/teachers/habits/');
	} );
	
	app.get('/teachers/habits', auth.check, habits.habitsList );
	app.get('/teachers/habits/edit', auth.check, habits.editHabit );
	app.post('/teachers/habits/edit', auth.check, habits.editHabitSubmit ); // post
	app.get('/teachers/history', auth.check, habits.history );
	
	app.get('/teachers/admin', auth.check, teachers.admin );
	app.get('/teachers/edit', auth.check, teachers.editProfile );	
	app.post('/teachers/edit', auth.check, teachers.editProfileSubmit ); // post
	
	app.get('/teachers/admin/groups/', auth.check, teachers.listGroups );
	
	app.get('/teachers/admin/groups/create', auth.check, teachers.createGroup );
	app.post('/teachers/admin/groups/create', auth.check, teachers.createGroupSubmit ); // post
	
	app.get('/teachers/admin/groups/populate', auth.check, teachers.populate );
	app.post('/teachers/admin/groups/populate', auth.check, teachers.populateSubmit ); // post
		
	
	////////////////////////////////////////////////////////////////////////////////
	// Admin
//	app.get('/admin/', auth.check, admin.landing );
	app.get('/admin/', auth.check, function(req,res){
		res.redirect('/admin/habits/');
	} );
	
	app.get('/admin/habits', auth.check, habits.habitsList );
	app.get('/admin/habits/edit', auth.check, habits.editHabit );
	app.post('/admin/habits/edit', auth.check, habits.editHabitSubmit ); // post
	app.get('/admin/history', auth.check, habits.history );
	
	app.get('/admin/admin', auth.check, admin.admin );
	app.get('/admin/edit', auth.check, admin.editProfile );	
	app.post('/admin/edit', auth.check, admin.editProfileSubmit ); // post



	app.get('/admin/admin/users/', auth.check, admin.listUsers );
	
	app.get('/admin/admin/users/create', auth.check, admin.createUser );
	app.post('/admin/admin/users/create', auth.check, admin.createUserSubmit ); // post
	
	app.get('/admin/admin/users/edit', auth.check, admin.editUser );
	app.post('/admin/admin/users/edit', auth.check, admin.editUserSubmit ); // post
	
	app.get('/admin/admin/users/delete', auth.check, admin.deleteUser );
	app.post('/admin/admin/users/delete', auth.check, admin.deleteUserSubmit ); // post

	app.get('/admin/admin/users/cleanup', auth.check, admin.cleanup );
	app.post('/admin/admin/users/cleanup', auth.check, admin.cleanupSubmit ); // post

	
	app.get('/admin/admin/groups/', auth.check, admin.listGroups );
	
	app.get('/admin/admin/groups/create', auth.check, admin.createGroup );
	app.post('/admin/admin/groups/create', auth.check, admin.createGroupSubmit ); // post
	
	app.get('/admin/admin/groups/populate', auth.check, admin.populate );
	app.post('/admin/admin/groups/populate', auth.check, admin.populateSubmit ); // post
	
	app.get('/admin/admin/groups/edit', auth.check, admin.editGroup );
	app.post('/admin/admin/groups/edit', auth.check, admin.editGroupSubmit ); // post	
	
	app.get('/admin/admin/groups/delete', auth.check, admin.deleteGroup );
	app.post('/admin/admin/groups/delete', auth.check, admin.deleteGroupSubmit ); // post


//	app.get('/admin/test', auth.check, admin.test );
	

	////////////////////////////////////////////////////////////////////////////////
	// Other
		
	// Denied
	app.get( config.deniedRoute, denied );
	
	// Lost - 404
	app.all('*', lost );

};
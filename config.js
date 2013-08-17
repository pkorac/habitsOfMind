
// Database
// array of values for now


// Login and denied routes
exports.loginRoute = '/login';
exports.deniedRoute = '/denied';


// Flash Error message
exports.flasherror = 'error';


// User types & access
exports.userTypes = {
	"admin": ["students", "teachers", "admin"],
	"student": [ "students" ],
	"teacher": [ "teachers" ]
};
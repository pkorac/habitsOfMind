// Users and routes
//	- defines which users can go where
//	- the first route in the array is the default landing screen
//  (for example admin users get taken to admin screen after login)
exports.userTypes = {
	"admin": ["admin", "students", "teachers"],
	"student": [ "students" ],
	"teacher": [ "teachers" ]
};

exports.defaultUserType = "student";
exports.defaultClass = "others";

exports.defaultUserSecret = "plums";



// Database

// Hashing
exports.hashDepth = 10;

// Session Cookie secret
exports.secret = "oranges";

// Login and denied routes
exports.loginRoute = '/login';
exports.deniedRoute = '/denied';
exports.registerRoute = '/register';


// Flash message
exports.flashMessage = 'message';
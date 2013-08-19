
// Database

// Encription
exports.defaultUserSecret = "plums";
exports.hashDepth = 10;


// Session Cookie secret
exports.secret = "oranges";

// Login and denied routes
exports.loginRoute = '/login';
exports.deniedRoute = '/denied';
exports.registerRoute = '/register';


// Flash Error message
exports.flashError = 'error';


// User
exports.userTypes = {
	"admin": ["students", "teachers", "admin"],
	"student": [ "students" ],
	"teacher": [ "teachers" ]
};

exports.defaultUserType = "student";
exports.defaultClass = "others";
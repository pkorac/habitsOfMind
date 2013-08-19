
// Database

<<<<<<< HEAD
// Encription
exports.defaultUserSecret = "plums";
=======
// Bcrypt depth
>>>>>>> ee96613c820779bd2b6d545253fa5b70d683632a
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

<<<<<<< HEAD
exports.defaultUserType = "student";
exports.defaultClass = "others";
=======
exports.defaultUserType = "student";
>>>>>>> ee96613c820779bd2b6d545253fa5b70d683632a

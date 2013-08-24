// Users and routes
//	- defines which users can go where
//  - each key denotes a user type
//  - each value holds an array of routes that user type has access to
//	- the first route in the array is the default landing screen
//  (for example admin users get taken to admin screen after login)
exports.userTypes = {
	"admin": ["admin", "students", "teachers"],
	"student": [ "students" ],
	"teacher": [ "teachers" ]
};
exports.genders = ["boy", "girl"];
exports.defaultGender = "boy";

exports.defaultUserType = "student";
exports.defaultClass = "Everyone else";
exports.defaultYear = 7;

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


// Setup
exports.firstGroup = {
	"_id": "007",
	"name": "Everyone else", 
	"year": 2013, 
	"teacher": "No one",
	"docType": "group"
};
exports.firstUser  = {
	"name": "admin", 
	"type": "admin",
	"habitsGroup": "007",
	"docType": "user"
};

exports.views = {};
exports.views.lists = {
	_id: "_design/lists",
	language: "javascript",
	views: {
		listusers: {
			map: 'function(doc) { if( doc.docType === "user" ) emit( doc._id, doc ); }'
		},
		listgroups:{
			map: 'function(doc) { if( doc.docType === "group" ) emit( doc._id, doc ); }'
		}
	}
};









// Have fun
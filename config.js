// Users and routes
//	- defines which user types and their landing pages can go where
exports.userTypes = {
	"admin": "/admin/",
	"student": "/students/",
	"teacher": "/teachers/"
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
exports.flashMessageSuccess = 'messageSuccess';


// DATABASE SETUP
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
		listusernames: {
			map: 'function(doc) { if( doc.docType === "user" ) emit( doc.name, doc ); }',
			url: "_design/lists/_view/listusernames"
		},
		listuserids: {
			map: 'function(doc) { if( doc.docType === "user" ) emit( doc._id, doc ); }',
			url: "_design/lists/_view/listuserids"
		},
		listusertokens: {
			map: 'function(doc) { if( doc.docType === "user" && doc.validationToken ) emit( doc.validationToken, doc ); }',
			url: "_design/lists/_view/listusertokens"
		},
		listgroupnames:{
			map: 'function(doc) { if( doc.docType === "group" ) emit( doc.name, doc ); }',
			url: "_design/lists/_view/listgroupnames"
		},
		listgroupids:{
			map: 'function(doc) { if( doc.docType === "group" ) emit( doc._id, doc ); }',
			url: "_design/lists/_view/listgroupids"
		}
	}
};

exports.userDocType = "user";
exports.groupDocType = "group";







// Have fun

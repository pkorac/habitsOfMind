var fs = require('fs'), util = require('util');

// THE MAIN (https) URL OF THE WEBSITE
exports.url = "https://pktallis.herokuapp.com";

// Users and routes
//	- defines which user types and their landing pages can go where
exports.userTypes = {
	"admin": "/admin/",
	"student": "/students/",
	"teacher": "/teachers/"
};
exports.genders = ["male", "female"];
exports.defaultGender = "boy";

exports.defaultUserType = "student";
exports.defaultClass = "Everyone else";
exports.defaultYear = 7;

exports.defaultUserSecret = "plums";


// Habits

exports.habits = JSON.parse( fs.readFileSync('habits.json').toString() );
//var hab = JSON.parse( fs.readFileSync('habits.json').toString() );
//console.log( util.inspect( hab, {colors: true} ) );

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

// Users DB
exports.userViews = {};
exports.userViews.lists = {
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


// Data DB
exports.dataViews = {};
exports.dataViews.lists = {
	_id: "_design/lists",
	language: "javascript",
	views: {
		habitsByGroup: {
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar med = 0;\n\tfor ( var i = 0; i < doc.subhabits.length; i++){\n\t\tvar value = parseFloat( doc.subhabits[i] );\n\t\tif ( value ){\n\t\t\tmed += value;\n\t\t}\n\t}\n\tmed /= doc.subhabits.length;\n\temit(["THISYEAR", doc.group, years, months, days, doc.habit], med);\n\temit(["THISMONTH", doc.group, years, months, days, hours, doc.habit], med);\n\temit(["THISWEEK", doc.group, years, months, days, hours, minutes, doc.habit], med);\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByGroup"
		},
		habitsByUserSub0: {
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar value = parseFloat( doc.subhabits[0] );\n\tif ( value ){\n\t\temit([doc.user, doc.habit, years, months, days, hours, minutes], doc.subhabits[0]);\n\t}\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByUserSub0"
		},
		habitsByUserSub1: {
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar value = parseFloat( doc.subhabits[1] );\n\tif ( value ){\n\t\temit([doc.user, doc.habit, years, months, days, hours, minutes], doc.subhabits[1]);\n\t}\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByUserSub1"
		},
		habitsByUserSub2: {
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar value = parseFloat( doc.subhabits[2] );\n\tif ( value ){\n\t\temit([doc.user, doc.habit, years, months, days, hours, minutes], doc.subhabits[2]);\n\t}\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByUserSub2"
		},
		habitsByUser: {
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar med = 0;\n\tfor ( var i = 0; i < doc.subhabits.length; i++){\n\t\tvar value = parseFloat( doc.subhabits[i] );\n\t\tif ( value ){\n\t\t\tmed += value;\n\t\t}\n\t}\n\tmed /= doc.subhabits.length;\n\temit(["THISYEAR", doc.user, years, months, days, doc.habit], med);\n\temit(["THISMONTH", doc.user, years, months, days, hours, doc.habit], med);\n\temit(["THISWEEK", doc.user, years, months, days, hours, minutes, doc.habit], med);\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByUser"
		}
	}
};


// Have fun

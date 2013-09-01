var fs = require('fs');

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


// Habits

exports.habits = JSON.parse( fs.readFileSync('habits.json').toString() );

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
			map: 'function (doc) {\n  emit([doc.user, doc.habit, doc.date], doc.subhabits);\n}',
			reduce: 'function ( keys, values, rereduce ){\n\tif( rereduce ){\n\n\t\tvar sub1 = 0;\n\t\tvar sub2 = 0;\n\t\tvar sub3 = 0;\n\t\tvar sumall = 0;\n\t\t\n\t\tfor ( var i = 0; i < values.length; i++ ){\n\t\t\tsub1 += values[i].subhabits[0];\n\t\t\tsub2 += values[i].subhabits[1];\n\t\t\tsub3 += values[i].subhabits[2];\n\t\t\tsumall += values[i].all;\n\t\t}\n\n\t\treturn { subhabits: [sub1, sub2, sub3], all: sumall };\n\t} else{\n\t\tvar sub1 = 0;\n\t\tvar sub2 = 0;\n\t\tvar sub3 = 0;\n\t\tfor( var i = 0; i < values.length; i++){\n\t\t\tsub1 += parseFloat(values[i][0]);\n\t\t\tsub2 += parseFloat(values[i][1]);\n\t\t\tsub3 += parseFloat(values[i][2]);\n\t\t}\n\t\treturn { \n\t\t\tsubhabits: [sub1, sub2, sub3], \n\t\t\tall: values.length\n\t\t};\n\t}\n}',
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
			map: 'function (doc) {\n   if( doc.subhabits && doc.habit && doc.user && doc.date && doc.group ){\n\n\tvar d = new Date( doc.date );\n\tvar years = d.getFullYear();\n\tvar months = d.getMonth();\n\tvar days = d.getDate();\n\tvar hours = d.getHours();\n\tvar minutes = d.getMinutes();\n\n\tvar med = 0;\n\tfor ( var i = 0; i < doc.subhabits.length; i++){\n\t\tvar value = parseFloat( doc.subhabits[i] );\n\t\tif ( value ){\n\t\t\tmed += value;\n\t\t}\n\t}\n\tmed /= doc.subhabits.length;\n\temit([doc.user, doc.habit, years, months, days, hours, minutes], med);\n   }\n}',
			reduce: '_stats',
			url: "_design/lists/_view/habitsByUser"
		}
	}
};

// Have fun

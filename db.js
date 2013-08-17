// Temp db
var crypto = require('crypto');
var config = require('./config');

var users = [
		{ id: "321d", name: "peter", type: "admin", password: "$2a$12$BMFas1cz.aRExdu6LxITregmcQ4IPWr061JMqloMTcVwAR0AfdAtC", content: "I like carrots" },
		{ id: "593kdsa", name: "ali", type: "student", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", content: "I like banoffy pie" }];


// Find (and return) user by name
function findUserbyName( name ){
	for ( var i = 0; i < users.length; i++ ){
		if ( users[i].name === name ){
			return users[i];
		}
	}
	return null;
}

function listUsers(){
	return users;
}

// Create a new user
function newUser(){
	var id = crypto.randomBytes(20).toString('hex');
	console.log(id);
}



exports.findUserbyName = findUserbyName; // only user and password
exports.listUsers = listUsers;

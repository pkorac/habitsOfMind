/*

	DB Module
	Takes Care of the database and model	
	
	User profile functions:
	- listUsers() // returns a list of users
	- findUserbyName( name ) // returns user or null
	- findUserbyId( id )  // returns user or null
	- addUser
	- generateEmptyUser
	- editUser

	Classes
	- listClasses() // returns a list of users
	- findClassbyId( id ) // returns class or null
	- addClass( name, year, teacher, callback ) // callback returns err or null
	- editClass( id, name, year, teacher, callback )
	
	Helper Functions
	- hashPassword( pass, fn ) // callback returns (err, hash)
	- checkPassword( pass, hash, fn ) // calback returns (err, boolean)
	- randomHash() // returns id
	
	
*/

// Temp db
var util = require('util'),
	config = require('./config'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto');

// Temp DB
var users = [
		{ id: "321d", name: "peter", type: "admin", password: "$2a$12$BMFas1cz.aRExdu6LxITregmcQ4IPWr061JMqloMTcVwAR0AfdAtC", content: "I like carrots" },
		{ id: "593kdsa", name: "ali", type: "student", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", content: "I like banoffy pie" }];

var classes = [ { id: "123", name: "8jn", year: 8, teacher: "Jon" },
				{ id: "1234", name: "7pk", year: 7, teacher: "Peter" } ];


///////////////////////////////////////////////////////////////////////////
//
// Model objects
//
///////////////////////////////////////////////////////////////////////////

// Users
var HabitsUser = function( name, pass, type ){
	this.id = randomHash();
	this.name = name;
	this.type = type;
	this.password = pass;
};

// Classes
var HabitsClass = function( name, year, teacher ){
	this.id = randomHash();
	this.name = name;
	this.year = year;
	this.teacher = teacher;
};


///////////////////////////////////////////////////////////////////////////
//
// Helper Functions
//
///////////////////////////////////////////////////////////////////////////

// Hash password
function hashPassword( pass, fn ){
	if ( pass ){
		//console.log("Hashing " + pass );
		bcrypt.hash( pass, config.hashDepth, fn );
	} else{
		fn(new Error("No password to hash"), null);
	}
}

function hashPasswordSync( pass ){
	if ( pass ){
		return bcrypt.hashSync( pass, config.hashDepth );
	} else{
		return null;
	}
}

// Compare passwords
function checkPassword( pass, hash, fn ){
	bcrypt.compare( pass, hash, fn );
}



// Random hash
function randomHash(){
	return crypto.randomBytes(30).toString('hex');
}

var characterPalette = "abcdefghijklmnopqrstuvwxyz0123456789";
var paletteSize = characterPalette.length;

function randomFourCharacters(){
	var randomFour = "";
	for ( var i = 0; i < 4; i++ ){
		randomFour += characterPalette[ Math.floor( Math.random()*paletteSize ) ];
	}
	return randomFour;
}


///////////////////////////////////////////////////////////////////////////
//
// USERS' Functions
//
///////////////////////////////////////////////////////////////////////////

// LIST users
function listUsers(){
	return users;
}


// FIND user by name
function findUserbyName( name, fn ){
	for ( var i = 0; i < users.length; i++ ){
		if ( users[i].name === name ){
			fn( null, users[i] );
			return;
		}
	}
	fn( new Error("No such user"), null );
}

// FIND user by id
function findUserbyId( id, fn ){
	for ( var i = 0; i < users.length; i++ ){
		if ( users[i].id === id ){
			fn( null, users[i] );
			return;
		}
	}
	fn( new Error("No such user"), null );
	return;
}


// ADD user manually
function addUser( name, password, type, fn ){
	if ( name ){
		findUserbyName( name, function(err, user){
			if ( user ){
				fn( new Error("User already exists") );
			} else {
				
				hashPassword( password, function(err, hashedPass){
					var newUser = new HabitsUser( name, hashedPass, type );	
					users.push( newUser );
					
					fn(null);
					
				} );
				
			}
		} );	
	} else{
		fn( new Error("Every user needs a name") );
	}
}



// GENERATE users with validation tokens
function generateEmptyUsers( howMany, fn ){
	
	if ( howMany < 1679616 ){ 	// no more than possible combinations using randomFour()

		var clones = new Array();
		var tokens = new Array();
		
		function generateToken(){
			
			var token = randomFourCharacters();
			for( var i = 0; i < clones.length; i++ ){
				if ( clones[i].validationtoken === token ) {
					token = generateToken();
				}
			}
			return token;
		}
		
		process.nextTick( function(){
			for ( var i = 0; i < howMany; i++ ){				
				var emptyUser = new HabitsUser( randomHash(), randomHash(), config.defaultUserType );
				var token = generateToken();
				emptyUser.validationtoken =  hashPasswordSync( token );
				clones.push( emptyUser );
				tokens.push( token );
			}

				// BULK SAVE them in the db
			users = users.concat( clones );
			fn( null, tokens );
		
		} );
		
	} else{
		fn( new Error("Can't generate that many"), null );
	}
}

// Cleanup empty users
function cleanupEmptyusers(){
	
};


// EDIT user
function editUser(){
	
}



// DELETE user
function deleteUser( id, fn ){

	findUserbyId( id, function( err, user ){
		
		if ( user ){
			
			var index = 0;
			for ( var i = 0; i < users.length; i++ ){
				if ( users[i].id === id ){
					index = i;
				}
			}
			//console.log( "Removing %s", users[index].name );
			users.splice( index, 1 );
			fn( null );
			
		} else{
			fn( new Error("No Such user") );
		}
		
	} );		
}



///////////////////////////////////////////////////////////////////////////
//
// CLASS' Functions
//
///////////////////////////////////////////////////////////////////////////

// LIST classes
function listClasses(){
	return classes;
}

// FIND class by id
function findClassbyId( id, fn ){
	for ( var i = 0; i < classes.length; i++ ){
		if ( classes[i].id === id ){
			fn( null, classes[i] );
			return;
		}
	}
	fn( new Error("No such class"), null );
	return;
}

// ADD a new class
function addClass( name, year, teacher, callback ){
	
	if ( !name ){
		callback( new Error("No name") );
	} else {
		// Create new class
		var id = randomHash();
		var newClass = { id: id,
						name: name, 
						year: year, 
						teacher: teacher };
						
		classes.push( newClass );
		callback( null );
	}
}

// EDIT a class
function editClass( id, name, year, teacher, callback ){
	if ( !id ){
		callback( new Error("No ID") );
		return;
	} 
	
	findClassbyId( id, function(err, theClass){
	
		if ( !theClass || err ){
			callback( new Error("No such class") );	
		} else{
			theClass.name = name;
			theClass.year = year;
			theClass.teacher = teacher;
			
			// add the new class to the DB
			// for the moment array splicing
			var index = 0;
			for ( var i = 0; i < classes.length; i++ ){
				if ( classes[i].id === id ){
					index = i;
				}
			}
			//console.log( "Removing %s's class", classes[index].teacher );
			classes.splice( index, 1, theClass );
			callback( null );
		}		
		
	} );
	
}

// DELETE Class
function deleteClass( id, fn ){

	findClassbyId( id, function(err, theClass){
		if ( !theClass || err ){
			fn( new Error("No such class") );
		} else{
			var index = 0;
			for ( var i = 0; i < classes.length; i++ ){
				if ( classes[i].id === id ){
					index = i;
				}
			}
			//console.log( "Removing %s's class", classes[index].teacher );
			classes.splice( index, 1 );
			fn(null);
		}		
		
	} );
}


////////////////////////////////////////////////////////////
//
// Tests
//
///////////////////////////////////////////////////////////////////////////

console.log( "---------------------------" );




////////////////////////////////////////////////////////////
//
// Exports
//
///////////////////////////////////////////////////////////////////////////

exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
exports.randomHash = randomHash;

exports.listUsers = listUsers;
exports.findUserbyName = findUserbyName;
exports.findUserbyId = findUserbyId;
exports.addUser = addUser;
exports.generateEmptyUsers = generateEmptyUsers;
exports.deleteUser = deleteUser;

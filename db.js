/*

	DB Module
	Takes Care of the database and model	
	
	User profile functions:
	- listUsers( fn )
		- fn( err, users)
	- findUserbyName( name, fn )
		- fn( err, user )
	- findUserbyId( id, fn )
		- fn ( err, user )
	- addUser( name, password, type, fn )
		- fn( err, user )
	- generateEmptyUsers( howMany, fn )
		- fn( err, validationTokens )		

	- cleanupEmptyusers
	- editUser
	
	- deleteUser( id, fn )
		- fn ( err )


	Classes
	- listClasses( fn )
		- fn( err, classes )
	- findClassbyId( id, fn )
		- fn( err, class )
	- addClass( name, year, teacher, fn )
		- fn( err )
	- editClass( id, name, year, teacher, fn )
		- fn( err )
	
	
	Helper Functions
	- hashPassword( pass, fn )
		- fn( err, hash )
	- checkPassword( pass, hash, fn )
		- fn( err, check )
	- randomHashSync() // sync
		- returns hash
	- randomFourCharacters() // sync
		- returns four characters
		
*/

// Temp db
var util = require('util'),
	config = require('./config'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto');

// Temp DB
var users = [
		{ id: "321d", name: "peter", type: "admin", password: "$2a$12$BMFas1cz.aRExdu6LxITregmcQ4IPWr061JMqloMTcVwAR0AfdAtC", email: "peter@sem.com", habbitsClass: "123" },
		{ id: "593kdsa", name: "ali", type: "student", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", email: "ali@sem.com", habbitsClass: "123" },
		{ id: 'c8f6908f3f96023f4ff63af13d5d8299f5abc878841888db24c67b1cb888',name: '7158e8d519766b8e5ed99d24151c2ae53de337d026a85f4b74de957238a4',type: 'student',password: '9719377ba92fb56e3265656645700ad0ccbf290ac5dc4f5eeddb98859743',email: null,habitsClass: '8pk',validationToken: '7777',validationSecret: 'sweet nothings' }];

var classes = [ { id: "123", name: "8jn", year: 8, teacher: "Jon" },
				{ id: "1234", name: "7pk", year: 7, teacher: "Peter" } ];


///////////////////////////////////////////////////////////////////////////
//
// Model objects
//
///////////////////////////////////////////////////////////////////////////

// Users
var HabitsUser = function( id, name, pass, type, email, habitsClass ){
	this.id = id;
	this.name = name;
	this.type = type;
	this.password = pass;
	this.email = email;
	this.habitsClass = habitsClass;
};

// Classes
var HabitsClass = function( id, name, year, teacher ){
	this.id = id;
	this.name = name;
	this.year = year;
	this.teacher = teacher;
};

var studentUserType = "student";

///////////////////////////////////////////////////////////////////////////
//
// Helper Functions
//
///////////////////////////////////////////////////////////////////////////

// Hash password
function hashPassword( pass, fn ){
	if ( pass ){
		//console.log("Hashing " + pass );
		bcrypt.hash( pass, config.hashDepth, fn ); // bcrypt callback returns err, hash
	} else{
		fn(new Error("No password to hash"), null);
	}
}


// Compare passwords
function checkPassword( pass, hash, fn ){
	bcrypt.compare( pass, hash, fn ); // bcrypt callback returns err, passwordCheck
}



// Random hash
function randomHashSync(){
	return crypto.randomBytes(30).toString('hex');
}

function randomHash( fn ){
	crypto.randomBytes( 30, function( err, bytes ){
		fn( err, bytes.toString('hex') );
	} );
}

// Token Generation
var characterPalette = "abcdefghijklmnopqrstuvwxyz0123456789";
var paletteSize = characterPalette.length;

function randomFourCharacters(){
	var randomFour = "";
	for ( var i = 0; i < 4; i++ ){
		randomFour += characterPalette[ Math.floor( Math.random()*paletteSize ) ];
	}
	return randomFour;
}

function generateValidationToken( fn ){
	
	var generateToken = function(){

		// Generate the random token
		var token = randomFourCharacters();
		
		findUserbyValidationToken( token, function(err, user){
			if( user){
				// token already exists
				//console.log( "bad token: " + token );
				generateToken();
			} else{
				//console.log( "good token: " + token );
				fn(null, token);
				return;
			}
		} );
				
	};
	generateToken();	
}


///////////////////////////////////////////////////////////////////////////
//
// USERS' Functions
//
///////////////////////////////////////////////////////////////////////////

// LIST users
function listUsers( fn ){
	fn( null, users );
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

// FIND user by validation token
// this should be async
function findUserbyValidationToken( token, fn ){
	for ( var i = 0; i < users.length; i++ ){
		if( users[i].validationToken === token ){
			fn( null, users[i] );
			return;
		}
	}
	fn( new Error("No such user"), null );
}




// Create a User
function createUser( secret, type, email, habitsClass, fn ){

	secret = secret || config.defaultUserSecret;
	type = type || config.defaultUserType;
	habitsClass = habitsClass || config.defaultClass;
	email = email || null;
	
	randomHash( function(err, id){
		if(!err) randomHash( function(err, name){
			if(!err) randomHash( function(err, pass){				
				hashPassword( secret, function(err, hashedSecret){					
					generateValidationToken( function(err, token){

						// Create the user
						var newUser = new HabitsUser( id, name, pass, type, email, habitsClass );
						newUser.validationToken = token;
						newUser.validationSecret = hashedSecret;
						
						fn( null, newUser, token );

					} );
				} );				
			} );			
		} );
	} );
	
}
// Create Empty User
function createEmptyUser( secret, type, fn ){
	createUser( secret, type, null, null, fn );
}


// ADD user one by one
function addUser( user, fn ){
	if( user ){		
		users.push( user );
		fn( null );		
	} else{
		fn( new Erro("No user to add") );
	}
}

// Add Students
function addStudents( howMany, secret, habitsClass, fn ){ // habits class needs to be checked etc
	
	if ( howMany < 1679616 ){ 	// no more than possible combinations using randomFour()
		
		type = studentUserType;
		secret = secret || config.defaultUserSecret;
		habitsClass = habitsClass || config.defaultClass;

		var clones = new Array();
		var tokens = new Array();		
		
		var counter = 0;
		var generateUsers = function(){
			counter++;		
			if ( counter <= howMany ) {
				// Create a user
				createUser( secret, type, null, habitsClass, function(err, user, token){
					clones.push( user );
					tokens.push( token );
					
					generateUsers();
				} );
			
			} else{
				
				// BULK SAVE them in the db now
				users = users.concat( clones );
				fn( null, tokens );

			}

		};
		generateUsers();
		
	} else{
		fn( new Error("Can't generate that many"), null );
	}
}



// Cleanup empty users
function cleanupEmptyUsers( fn ){

	listUsers( function(err, users){
		
		// This would probably be better done on the couch side
		if (users){
		
			// Find which ones to remove
			var usersToRemove = new Array();
			for( var i = 0; i < users.length; i++ ){
				if ( users[i].validationToken ) {
					usersToRemove.push( users[i].id );
				}
			}
			
			var remove = function( id ){
				for( var j = 0; j < users.length; j++){
					if ( users[j].id === id ){
						users.splice( j, 1 );
						break;
					}
				}
			};

			// Go through them and remove them
			for ( var i = 0; i < usersToRemove.length; i++){
				remove( usersToRemove[i] );
			}
			fn(null);
			
		} else{
			fn( new Error("No empty users to delete") );
		}
		
	});
	
};

// EDIT user
function editUser( id, name, pass, type, email, habitsClass, validationToken, fn ){	

	findUserbyId( id, function(err, user){		
		if ( user ){
			
			if( name ) user.name = name;
			if( type ) user.type = type;
			if( email ) user.email = email;
			if( habitsClass ) user.habits = habitsClass;
			if( validationToken ) user.validationToken = validationToken;

			if( pass ) {
				hashPassword( pass, function(err, hashedPass){
					user.password = hashedPass;
					fn( null, user );
				} );
			} else{
				userReplacement( user, fn );				
			}
			
			
			function userReplacement( user, fn ){
				// replace the old one with the new one
				listUsers( function(err, users){
					for ( var i = 0; i < users.length; i++ ){
						if ( users[i].id === user.id ){
							users.splice( i, 1, user );
							fn( null, user );
							break;
						}
					}
				} );				
			}

			
		}else{
			fn( new Error("No such user"), null );
		}
		
	} );
}

// Change Password
function changePassword( id, newPass ){
	
}

function requestChangeOfPassword( id ){
	
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
function listClasses( fn ){
	fn( null, classes );
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
function addClass( name, year, teacher, fn ){
	
	if ( !name ){
		fn( new Error("No name") );
	} else {
		// Generate an id
		randomHash( function(err, id){
			if(!err){
				var newHabitsClass = new HabitsClass( id, name, year, teacher );
				classes.push( newHabitsClass );
				fn( null, newHabitsClass );
			} else {
				fn( err, null );
			}
		} );
	}
}


// EDIT a class
function editClass( id, name, year, teacher, fn ){
	if ( !id ){
		fn( new Error("No ID") );
		return;
	} 
	
	findClassbyId( id, function(err, theClass){
	
		if ( !theClass || err ){
			fn( new Error("No such class") );	
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
			fn( null );
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


// single Token
/*
console.log("started");
generateValidationToken( function(err, token){
	console.log(token);
} );
*/


// Create User
/*
createUser( "oranges", "person", "me@me.com", "8pk", function(err, user, token){
	console.log( token );
	console.log( util.inspect( user, {colors: true} ) );
	
	
	console.log("--------");
	
	createEmptyUser( "plums", "alien", function(err, user, token){
		console.log( token );
		console.log( util.inspect( user, {colors: true} ) );
		
	} );
	
} );
*/

// Create Students
/*
addStudents( 3, "oranges", "9mm", function(err, tokens){
	
	console.log(tokens);
	listUsers( function(err, students){
		console.log( util.inspect( students, {colors: true} ) );
	} );
	
} );
*/



////////////////////////////////////////////////////////////
//
// Exports
//
///////////////////////////////////////////////////////////////////////////

// Helper Functions
exports.checkPassword = checkPassword;

// Users
exports.listUsers = listUsers;

exports.findUserbyName = findUserbyName;
exports.findUserbyId = findUserbyId;
exports.findUserbyValidationToken = findUserbyValidationToken;

exports.createUser = createUser;
exports.createEmptyUser = createEmptyUser;

exports.addUser = addUser;
exports.addStudents = addStudents

exports.editUser = editUser;
exports.deleteUser = deleteUser;

exports.cleanupEmptyUsers = cleanupEmptyUsers;

// Classes
exports.listClasses = listClasses;
exports.findClassbyId = findClassbyId;
exports.addClass = addClass;
exports.editClass = editClass;
exports.deleteClass = deleteClass;








// Have fun
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
		{ id: 'b0a6be7e2fc403ee5236e1c8c38c1a24f31699ab0323f102bcf7138bd9f8', name: '5833a8cca6b4ea2e1fd51c478f2d5ed931d848f8756da61d76108f19457c', type: 'teacher', password: 'd237578da6dd322debd81d49339bd4cff1bea0279d2a88e03c70f8f4136c', email: null, habitsClass: 'others', validationToken: '$2a$10$q6DOF9S3UqhNm0wO1elX..DT.Y2ROjnCcxgwnbmMqLrMAjzuMRvhu' }];

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

var characterPalette = "abcdefghijklmnopqrstuvwxyz0123456789";
var paletteSize = characterPalette.length;

function randomFourCharacters(){
	var randomFour = "";
	for ( var i = 0; i < 4; i++ ){
		randomFour += characterPalette[ Math.floor( Math.random()*paletteSize ) ];
	}
	return randomFour;
}

function emptyUser( fn ){
	
}

function emptyClass( fn ){
	
	randomHash( function(err, id){
		if(!err){
			var newHabitsClass = new HabitsClass( id, null, null, null );
			fn( null, newHabitsClass );
		} else{
			fn( err, null );
		}
	} );

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
function findUserbyValidationToken( token, fn ){
	for ( var i = 0; i < users.length; i++ ){
		if( users[i].validationToken ){
			if ( users[i].validationToken === token ){
				fn( null, users[i] );
				return;
			}
		}
	}
	fn( new Error("No such user"), null );
	return;
}


// ADD user manually
function addUser( user, fn ){
	if( user ){		
		users.push( user );
		fn( null );		
	} else{
		fn( new Erro("No user to add") );
	}
}

// Create a User
function createUser( type, email, habitsClass, fn ){

	type = type || config.defaultUserType;
	habitsClass = habitsClass || config.defaultClass;
	email = email || null;
	
	randomHash( function(err, id){
		if(!err) randomHash( function(err, name){
			if(!err) randomHash( function(err, pass){
				
				var token = randomFourCharacters();
				if(!err) hashPassword( token, function(err, hashedToken){

					if( err ){
						fn( new Error("Something went wrong"), null);
					} else{					
						// Create the user
						var newUser = new HabitsUser( id, name, pass, type, email, habitsClass );
						newUser.validationToken = hashedToken;
						
						fn( null, newUser, token );
					}
					
				} );
				
			} );			
		} );
	} );
	
}
// Create Empty User
function createEmptyUser( type, fn ){
	createUser( type, null, null, fn );
}


// Add empty users
function addEmptyUsers( howMany, type, fn ){
	
	if ( howMany < 1679616 ){ 	// no more than possible combinations using randomFour()
		
		type = type || config.defaultUserType;

		var clones = new Array();
		var tokens = new Array();
		
		var generateToken = function(){
			
			var token = randomFourCharacters();
			for( var i = 0; i < clones.length; i++ ){
				if ( clones[i].validationToken === token ) {
					token = generateToken();
				}
			}
			return token;
		}
		
		var counter = 0;
		var generateUsers = function(){
			counter++;		
			if ( counter <= howMany ) {
				// Create a user
				createEmptyUser( type, function(err, user, token){
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

addEmptyUsers( 1, "student", function(err, tokens){
	console.log( tokens );
	
	listUsers( function(err, users){
		
		console.log( util.inspect( users, {colors: true} ) );
	} );
	
} );


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
exports.addEmptyUsers = addEmptyUsers;

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
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
		{ id: "593kdsa", name: "ali", type: "student", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", email: "ali@sem.com", habbitsClass: "123" }];

var classes = [ { id: "123", name: "8jn", year: 8, teacher: "Jon" },
				{ id: "1234", name: "7pk", year: 7, teacher: "Peter" } ];


///////////////////////////////////////////////////////////////////////////
//
// Model objects
//
///////////////////////////////////////////////////////////////////////////

// Users
var HabitsUser = function( name, pass, type, email, habitsClass ){
	this.id = randomHashSync();
	this.name = name;
	this.type = type;
	this.password = pass;
	this.email = email;
	this.habitsClass = habitsClass;
};

// Classes
var HabitsClass = function( name, year, teacher ){
	this.id = randomHashSync();
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


// ADD user manually
function addUser( name, password, type, fn ){
	if ( name ){
		findUserbyName( name, function(err, user){
			if ( user ){
				fn( new Error("User already exists"), null );
			} else {
				
				hashPassword( password, function(err, hashedPass){
					if(err){
						fn( err, null );
					}else{
						var newUser = new HabitsUser( name, hashedPass, type );	
						users.push( newUser );						
						fn(null, newUser);
	
					}					
				} );
				
			}
		} );	
	} else{
		fn( new Error("Every user needs a name"), null );
	}
}






// GENERATE users with validation tokens
function generateEmptyUsers( howMany, fn ){
	
	if ( howMany < 1679616 ){ 	// no more than possible combinations using randomFour()

		var clones = new Array();
		var tokens = new Array();
		
		var generateToken = function(){
			
			var token = randomFourCharacters();
			for( var i = 0; i < clones.length; i++ ){
				if ( clones[i].validationtoken === token ) {
					token = generateToken();
				}
			}
			return token;
		}
		
		var counter = 0;
		var generateUsers = function(){
			counter++;		
			if ( counter <= howMany ) {
				// Do Stuff
				
				var token = generateToken();
				
				hashPassword( token, function(err, hash){
					var emptyUser = new HabitsUser( randomHashSync(), 
													randomHashSync(), 
													config.defaultUserType, 
													null, config.defaultClass );
					emptyUser.validationtoken =  hash;
					clones.push( emptyUser );
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
				if ( users[i].validationtoken ) {
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
			// bulk remove from db, for now with an array
			
		} else{
			fn( new Error("No empty users to delete") );
		}
		
	});
	
};



// EDIT user
function editUser( id, name, type, pass, fn ){
	
	findUserbyId( id, function(err, user){
		
		if ( user ){
			
		}else{
			
		}
		
	} );
	
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
		// Create new class
		var id = randomHashSync();
		var newClass = { id: id,
						name: name, 
						year: year, 
						teacher: teacher };
						
		classes.push( newClass );
		fn( null );
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



////////////////////////////////////////////////////////////
//
// Exports
//
///////////////////////////////////////////////////////////////////////////

exports.hashPassword = hashPassword;
exports.checkPassword = checkPassword;
exports.randomHashSync = randomHashSync;

exports.listUsers = listUsers;
exports.findUserbyName = findUserbyName;
exports.findUserbyId = findUserbyId;
exports.addUser = addUser;
exports.generateEmptyUsers = generateEmptyUsers;
exports.deleteUser = deleteUser;

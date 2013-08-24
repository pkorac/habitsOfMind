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
	- findUserbyValidationToken( token, fn )
		- fn (err, user )
	- createUser( secret, type, email, habitsGroup, fn )
		- fn( err, user )
	- createEmptyUser( secret, type, fn )
		- fn( err, user, token )
	- createUsers( howMany, secret, habitsGroup, fn )
		- fn( err, validationTokens )

	- cleanupEmptyusers
		- fn( err )

	- editUser( id, params, fn )
		- params( type, habitsGroup, email, password )
		- fn( err, editedUser )	
	- deleteUser( id, fn )
		- fn ( err )


	Groups
	- listGroups( fn )
		- fn( err, groups )
	- findGroupbyId( id, fn )
		- fn( err, group )
	- createGroup( name, year, teacher, fn )
		- fn( err, newGroup )
	- editGroup( id, name, year, teacher, fn )
		- fn( err, editedGroup )
	
	
	Helper Functions
	- hashPassword( pass, fn )
		- fn( err, hash )
	- checkPassword( pass, hash, fn )
		- fn( err, check )
	- randomHash( fn )
		- fn( err, hash )
	- randomHashSync() // sync
		- returns hash
	- randomFourCharacters() // sync
		- returns four characters
	- generateValidationToken( fn )
		- fn( err, token )
		

*/

// Temp db
var util = require('util'),
	config = require('./config'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto');

// Temp DB
var users = [
		{ id: "321d", name: "peter", type: "admin", password: "$2a$12$BMFas1cz.aRExdu6LxITregmcQ4IPWr061JMqloMTcVwAR0AfdAtC", email: "peter@sem.com", habitsGroup: "123", gender: 'boy'},
		{ id: "593kdsa", name: "ali", type: "teacher", password: "$2a$12$fk1sXnbqK5Oi88mESXEji.RG0gZJb4N84jBW6jydsVl330dvp81Nq", email: "ali@sem.com", habitsGroup: "123", gender: 'girl'},
		{ id: 'c8f6908f3f96023f4ff63af13d5d8299f5abc878841888db24c67b1cb888',name: '7158e8d519766b8e5ed99d24151c2ae53de337d026a85f4b74de957238a4',type: 'student',password: '9719377ba92fb56e3265656645700ad0ccbf290ac5dc4f5eeddb98859743',email: null,habitsGroup: '8pk', validationToken: '7777',validationSecret: 'plums' }];

var groups = [ { id: "123", name: "8jn", year: 8, teacher: "Jon" },
				{ id: "1234", name: "7pk", year: 7, teacher: "Peter" },
				{ id: "12345", name: "Everyone else", year: 3000, teacher: "No one"} ];


///////////////////////////////////////////////////////////////////////////
//
// Model objects
//
///////////////////////////////////////////////////////////////////////////

// Users
var HabitsUser = function( id, name, pass, type, email, habitsGroup, gender ){
	this.id = id;
	this.name = name;
	this.type = type;
	this.password = pass;
	this.email = email;
	this.habitsGroup = habitsGroup;
	this.gender = gender;
};

// Groups
var HabitsGroup = function( id, name, year, teacher ){
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


function listValidationTokens( fn ){
	var tokens = [];
	for( var i= 0; i < users.length; i++){
		if( users[i].validationToken ) tokens.push( users[i].validationToken );
	}
	fn( null, tokens );
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



// CREATE a User

function createUser( params, fn ){ // check if the group exists perhaps

	
	var secret = params.secret || config.defaultUserSecret,
	type = params.type || config.defaultUserType,
	habitsGroup = params.habitsGroup || null,
	email = params.email || null,
	gender = params.gender || config.defaultGender;
	
	randomHash( function(err, id){
		if(!err) randomHash( function(err, name){
			if(!err) randomHash( function(err, pass){				
				hashPassword( secret, function(err, hashedSecret){					
					generateValidationToken( function(err, token){

						// Create the user
						var newUser = new HabitsUser( id, name, pass, type, email, habitsGroup, gender );
						newUser.validationToken = token;
						newUser.validationSecret = hashedSecret;

						users.push( newUser ); // or done with DB
						
						fn( null, newUser, token );

					} );
				} );				
			} );			
		} );
	} );
	
}



// CREATE Users
function createUsers( howMany, secret, habitsGroup, gender, fn ){ // habits group needs to be checked etc

	if ( howMany < 1679616 ){ // the max possible combinations with random four characters
		
		type = config.defaultUserType;
		secret = secret || config.defaultUserSecret;
		habitsGroup = habitsGroup || config.defaultGroup;
		gender = gender || config.defaultGender;

			
		var clones = [];
		var tokens = [];
		
		
		var counter = 0;
		var generateUsers = function(){
			counter++;
			if ( counter <= howMany ) {
				
				randomHash( function(err, id){
					if(!err) randomHash( function(err, name){
							if(!err) randomHash( function(err, pass){				
								hashPassword( secret, function(err, hashedSecret){					
											
									// Create the user
									var newUser = new HabitsUser( id, name, pass, type, null,
																  habitsGroup, gender );
									var token = randomFourCharacters();
									newUser.validationToken = token;
									newUser.validationSecret = hashedSecret;

									tokens.push(token);
									clones.push( newUser ); // or done with DB

									generateUsers();
							} );
						} );
					} );
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






// CLEANUP empty users
function cleanupEmptyUsers( fn ){

	listUsers( function(err, users){
		
		// This would probably be better done on the couch side
		if (users){
		
			// Find which ones to remove
			var usersToRemove = [];
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
			for ( var j = 0; j < usersToRemove.length; j++){
				remove( usersToRemove[j] );
			}
			if ( usersToRemove.length < 1 ){
				fn( new Error("No empty users to delete") );
			}else{
				fn(null);	
			}
			
		} else{
			fn( new Error("Couldn't list users") );
		}
		
	});
	
}

// EDIT user
function editUser( id, params, fn ){

	findUserbyId( id, function(err, user){
		if ( user ){
			

			user.type = params.type || user.type;
			user.email = params.email || user.email;
			user.habitsGroup = params.habitsGroup || user.habitsGroup;
			user.gender = params.gender || user.gender;
			
			var updateUser = function( user, callback ){

				listUsers( function( err, users ){
					for( var i = 0; i < users.length; i++ ){
						if( users[i].id === user.id ){
							users = users.splice( i, 1, user );
							callback( null, user );
						}
					}
				} );
			};
			
			if ( params.password ){
				// do stuff
				hashPassword( params.password, function(err, hashedPassword){
					user.password = hashedPassword;
					
					updateUser( user, function(err, user){
						if(err){
							fn( err, null);
							return;
						}
						fn( null, user );
					} );
					
				} );
				
			} else{
				updateUser( user, function(err, user){
					if(err){
						fn( err, null);
						return;
					}
					fn( null, user );
				} );
			}
			
		}else{
			fn( new Error("No such user"), null );
		}
		
	} );
}



// Register user
function registerUser( id, name, password, email, fn ){
	findUserbyId( id, function( err, user ){
		if(err){
			fn( new Error("No such user"), null);
		}else if( !name || !password || !email ){
			fn( new Error("Not enough data"), null);
		} else{
			// Basic check done, let us continue
			
			// CHeck if the username exists
			findUserbyName( name, function(err, existinguser){
				if(existinguser){
					fn( new Error("User already exists"), null );
				} else{

					// All good let's register the lad
					hashPassword( password, function(err, hashedPass){
						if( err ){
							fn(err,null);
							return;
						} else{
							
							user.password = hashedPass;
							user.name = name;
							user.email = email;
							
							user.validationToken = null;
							user.validationSecret = null;
							
							var updateUser = function( user, callback ){
								listUsers( function( err, users ){
									for( var i = 0; i < users.length; i++ ){
										if( users[i].id === user.id ){
											users = users.splice( i, 1, user );
											callback( null, user );
										}
									}
								} );
							};
							updateUser( user, fn );
							
						}
					} );
					
				}
			} );
			
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

// LIST groups
function listGroups( fn ){
	fn( null, groups );
}


// FIND group by id
function findGroupbyId( id, fn ){
	for ( var i = 0; i < groups.length; i++ ){
		if ( groups[i].id === id ){
			fn( null, groups[i] );
			return;
		}
	}
	fn( new Error("No such group"), null );
	return;
}


// CREATE a new group
function createGroup( name, year, teacher, fn ){
	
	if ( !name ){
		fn( new Error("No name") );
	} else {
		// Generate an id
		randomHash( function(err, id){
			if(!err){				
				var newHabitsGroup = new HabitsGroup( id, name, year, teacher );
				groups.push( newHabitsGroup );
				fn( null, newHabitsGroup );
			} else {
				fn( err, null );
			}
		} );
	}
}



// EDIT a group
function editGroup( id, name, year, teacher, fn ){
	if ( !id ){
		fn( new Error("No ID"), null );
		return;
	} 
	
	findGroupbyId( id, function(err, theGroup){
	
		if ( !theGroup || err ){
			fn( new Error("No such group") );	
		} else{
			theGroup.name = name;
			theGroup.year = year;
			theGroup.teacher = teacher;
			
			// add the new group to the DB
			// for the moment array splicing
			var index = 0;
			for ( var i = 0; i < groups.length; i++ ){
				if ( groups[i].id === id ){
					index = i;
				}
			}
			//console.log( "Removing %s's group", groups[index].teacher );
			groups.splice( index, 1, theGroup );
			fn( null, theGroup );
		}		
		
	} );
	
}

// DELETE Group
function deleteGroup( id, fn ){

	findGroupbyId( id, function(err, theGroup){
		if ( !theGroup || err ){
			fn( new Error("No such group") );
		} else{

			var index = 0;
			for ( var i = 0; i < groups.length; i++ ){
				if ( groups[i].id === id ){
					index = i;
				}
			}
			//console.log( "Removing %s's group", groups[index].teacher );
			for ( var i = 0; i < users.length; i++ ){
						if( users[i].habitsGroup === id ) {
							users[i].habitsGroup = null;
						}
					}
			groups.splice( index, 1 );
			fn(null);					
			// really should do something with the users
/*
			listUsers( function(err, users){
				if (!err){
					for ( var i = 0; i < users.length; i++ ){
						if( users[i].habitsGroup === id ) {
							users[i].habitsGroup = null;
						}
					}
					groups.splice( index, 1 );
					fn(null);					
				}else{
					fn( err );
				}
			} );
*/
		}		
		
	} );
}




////////////////////////////////////////////////////////////
//
// Tests
//
///////////////////////////////////////////////////////////////////////////

console.log( "---------------------------" );


/*
registerUser( "c8f6908f3f96023f4ff63af13d5d8299f5abc878841888db24c67b1cb888", 
				"Mike", "sadf", "magic@mike.com", function( err,user ){
	if(err)console.log(err);
	console.log( util.inspect( user, {colors: true} ) );
					
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

exports.registerUser = registerUser;
exports.createUsers = createUsers;

exports.editUser = editUser;
exports.deleteUser = deleteUser;

exports.cleanupEmptyUsers = cleanupEmptyUsers;

// Groups
exports.listGroups = listGroups;
exports.findGroupbyId = findGroupbyId;
exports.createGroup = createGroup;
exports.editGroup = editGroup;
exports.deleteGroup = deleteGroup;








// Have fun
/*

	DB Module	
	A bit of a GOD class at the moment...
*/

// Temp db
var util = require('util'),
	config = require('./config'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	fs = require('fs'),
	couchrequest = require('couch-request');
	
// Credentials for the database (defined in creds.json)
var creds = JSON.parse( fs.readFileSync( 'creds.json' ).toString() ); // database credentials
var usersDB = couchrequest( {databaseUrl: creds.profilesDB} ); // user profiles
var dataDB = couchrequest( {databaseUrl: creds.dataDB} ); // user profiles


// View urls (defined in config.js)
var listusernames = config.userViews.lists.views.listusernames.url;
var listuserids = config.userViews.lists.views.listuserids.url;
var listusertokens = config.userViews.lists.views.listusertokens.url;
var listgroupnames = config.userViews.lists.views.listgroupnames.url;
var listgroupids = config.userViews.lists.views.listgroupids.url;
var listhabitsbygroup = config.dataViews.lists.views.habitsByGroup.url;
var listhabitsbyuser = config.dataViews.lists.views.habitsByUser.url



// Temp DB

///////////////////////////////////////////////////////////////////////////
//
// Model objects
//
///////////////////////////////////////////////////////////////////////////

// Users
var HabitsUser = function( id, name, pass, type, email, habitsGroup, gender ){
	this._id = id;
	this.name = name;
	this.type = type;
	this.password = pass;
	this.email = email;
	this.habitsGroup = habitsGroup;
	this.gender = gender;
	this.docType = config.userDocType;
};

// Groups
var HabitsGroup = function( id, name, year, teacher ){
	this._id = id;
	this.name = name;
	this.year = year;
	this.teacher = teacher;
	this.docType = config.groupDocType;
};

// Habits
var HabitsHabit = function( name, subhabits, user, group ){
	this.habit = name;
	this.subhabits = subhabits;
	this.user = user;
	this.group = group;	
	this.date = new Date();
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
	usersDB( listusernames, function(err, data){
		if( err ){
			fn( err, null);
		} else{
			var users = [];
			data.rows.forEach( function(row){
				users.push( row.value );
			} );
			fn( null, users );
		}
	} );
}


// FIND user by name
function findUserbyName( name, fn ){

	usersDB( listusernames+'?key="' + name + '"', function(err, data){
		if( err ){
			fn( err, null );
		} else{
			if( data.rows.length > 0 && data.rows[0].value ){
				fn( null, data.rows[0].value );
			} else{
				fn( new Error("No such user"), null );
			}
		}
	});
}


// FIND user by id
function findUserbyId( id, fn ){
	usersDB( listuserids+'?key="' + id + '"', function(err, data){
		if( err ){
			fn( err, null );
		} else{
			if( data.rows.length > 0 && data.rows[0].value ){
				fn( null, data.rows[0].value );
			} else{
				fn( new Error("No such user"), null );
			}
		}
	});
}


// FIND user by validation token
// this should be async
function findUserbyValidationToken( token, fn ){

	usersDB( listusertokens+'?key="' + token + '"', function(err, data){
		if( err ){
			fn( err, null );
		} else{
			if( data.rows.length > 0 && data.rows[0].value ){
				fn( null, data.rows[0].value );
			} else{
				fn( new Error("No such user"), null );				
			}
		}
	} );

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
						
						usersDB( "", newUser, function(err, data){
							if( err ) {
								fn( err, null, null);
							} else if ( data ){
							
								fn( null, newUser, token );	
								
							} else{
								fn( new Error("Something went wrong when creating the user"), null, null );
							}														
						} );

					} );
				} );				
			} );			
		} );
	} );
	
}



// CREATE Users
function createUsers( howMany, secret, habitsGroup, gender, fn ){ // habits group needs to be checked etc

	if ( howMany < 50 ){ // to limit the load even though you could generate 1679616 possible ones
		
		type = config.defaultUserType;
		secret = secret || config.defaultUserSecret;
		habitsGroup = habitsGroup || config.defaultGroup;
		gender = gender || config.defaultGender;

			
		var clones = [];
		var tokens = [];
		
		// Async loop
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
									clones.push( newUser );
									generateUsers();
							} );
						} );
					} );
				} );
				
				
				
			} else{
				
				// BULK SAVE them in the db now
				var docs = {
					docs: clones
				};
				usersDB( "_bulk_docs", docs, function(err, response){
					if (err) {
						fn( err, null );
					} else{
						fn( null, tokens );
					}
				});
	
			}
	
		};
		generateUsers(); // start the loop
		
	} else{
		fn( new Error("Can't generate that many at once"), null );
	}
}



// CLEANUP empty users
function cleanupEmptyUsers( fn ){

	usersDB( listusertokens, function(err, data){
		if ( err ){
			fn( new Error("Couldn't do it") );
		} else{
			if( data.rows.length > 0 ) {
				
				var docsToDelete = { docs: [] };
				data.rows.forEach( function( row ){
					var doc = { _id: row.value._id, _rev: row.value._rev, _deleted:true };
					docsToDelete.docs.push( doc );
				} );

				usersDB( '_bulk_docs', docsToDelete, function(err, data){
					if ( err ){
						fn( new Error("Something went wrong when deleting") );
					} else{
						
						// All good
						fn( null );
						
					}
				});
			} else{
				fn( new Error("No empty users to remove") );				
			}
		}
	} );	
}




// EDIT user
function editUser( id, params, fn ){

	
	usersDB( listuserids+ '?key="'+ id +'"', function(err, data){
		
		if( err ){
			fn( err, null );
		}
		if ( data.rows.length > 0){
			
			var user = data.rows[0].value;
			user.type = params.type || user.type;
			user.email = params.email || user.email;
			user.habitsGroup = params.habitsGroup || user.habitsGroup;
			user.gender = params.gender || user.gender;
			
			
			var updateUser = function( user, callback ){
				usersDB( "", user, function(err, data){
					if( err ) {
						callback( err, null );
					} else{
						callback( null, user );
					}
				} );
			};
			
			if( params.password ){
				
				hashPassword( params.password, function(err, hashedPassword){
					user.password = hashedPassword;
					updateUser( user, fn );
				});
				
			} else {
				// just update it
				updateUser( user, fn );
			}

		} else{
			fn( new Error("Could not find the user"), null );	
		}

		
	} );

}



// Register user
function registerUser( id, name, password, email, fn ){

	// Check id
	usersDB( listuserids+ '?key="'+ id +'"', function(err, data){
		if(err || !data.rows || data.rows.length < 1 ){
			fn( new Error("No such user"), null);
		}else if( !name || !password || !email ){
			fn( new Error("Not enough data"), null);
		} else{
	
			
			// Check username		
			usersDB( listusernames+ '?key="'+ name +'"', function(err, results){
				if ( err || (results.rows && results.rows.length > 0) ){
					fn( new Error("Username already exists"), null);
				} else{
					
					// All good let's register the lad
					hashPassword( password, function(err, hashedPass){
						if( err ){
							fn(err,null);
							return;
						} else{
							
							var user = data.rows[0].value;
							user.password = hashedPass;
							user.name = name;
							user.email = email;
							
							user.validationToken = null;
							user.validationSecret = null;
							
							usersDB( "", user, function( err, response ){
								if( err ){
									fn( err, null );
								}else{
									fn( null, user);
								}
							} );
							
						}
					} );

					
				}
				
			} );
		}
	});

}


// Change Password
function changePassword( id, newPass ){
	
}

function requestChangeOfPassword( id ){
	
}




// DELETE user
function deleteUser( id, fn ){

	usersDB( listuserids+ '?key="'+ id +'"', function(err, data){
		if(err || !data.rows || data.rows.length < 1 ){
			fn( new Error("No such user") );
		} else{
			
			var user = data.rows[0].value;
			user._deleted = true;
			usersDB( "", user, function(err, data){
				if( err ){
					fn( err);
				} else{
					fn( null );
				}
			} );	
		}
	});
}


///////////////////////////////////////////////////////////////////////////
//
// GROUPS' Functions
//
///////////////////////////////////////////////////////////////////////////

// LIST groups
function listGroups( fn ){
	usersDB( listgroupnames, function(err, data){
		if( err ){
			fn( err, null);
		} else{
			var groups = [];
			data.rows.forEach( function(row){
				groups.push( row.value );
			} );
			fn( null, groups );
		}
	} );
}


// FIND group by id
function findGroupbyId( id, fn ){
	usersDB( listgroupids+'?key="' + id + '"', function(err, data){
		if( err ){
			fn( err, null );
		} else{
			if( data.rows.length > 0 && data.rows[0].value ){
				fn( null, data.rows[0].value );
			} else{
				fn( new Error("No such group"), null );
			}
		}
	});
}



// CREATE a new group
function createGroup( name, year, teacher, fn ){
	
	if ( !name || !year || !teacher ){
		fn( new Error("No name") );
	} else {

	
		// Check if already exists
		usersDB( listgroupnames+'?key="' + name + '"', function(err, data){
			if ( err ){
				fn( err, null );
			} else if ( data.rows && data.rows.length > 0 ){
				fn( new Error("Group already exists"), null );
			} else{


				// all good
				randomHash( function(err, id){
					var newHabitsGroup = new HabitsGroup( id, name, year, teacher );
					
					
					usersDB( "", newHabitsGroup, function(err, response){
						if(err){
							fn( err, null );
						} else{
							fn( null, newHabitsGroup );
						}
					} );
				} );				
			}
		});
	}
}

// EDIT a group
function editGroup( id, name, year, teacher, fn ){
	if ( !id ){
		fn( new Error("No ID"), null );
		return;
	} 
	
	findGroupbyId( id, function(err, theGroup){
		if(err){
			fn(err, null);
		} else{
			theGroup.name = name || theGroup.name;
			theGroup.year = year || theGroup.year;
			theGroup.teacher = teacher || theGroup.teacher;
			
			usersDB( "", theGroup, function(err, data){
				if( err ){
					fn(err, null);
				} else{
					fn( null, theGroup );
				}
			});
			
		}
	} );	
}


// DELETE Group
function deleteGroup( id, fn ){

	if ( !id ){
		fn( new Error("No ID") );
		return;
	} 
	
	findGroupbyId( id, function(err, theGroup){
		if(err){
			fn( new Error("Coulnd't find the group to delete") );
		} else{
			
			theGroup._deleted = true;
			usersDB( "", theGroup, function(err, data){
				if( err ){
					fn(err);
				} else{
					fn( null );
				}
			});
			
		}
	} );

}


///////////////////////////////////////////////////////////////////////////
//
// HABITS' Functions
//
///////////////////////////////////////////////////////////////////////////

function saveHabit( params, fn ){
	if ( params.user && params.group && params.habit && params.subhabits && params.subhabits.length == 3 ){


		var newHabit = new HabitsHabit( params.habit, params.subhabits, params.user, params.group );

		dataDB( "", newHabit, function(err, response){
			if( err ){
				fn(err, null);
			} else{
				fn( null, response);
			}
		} );
		
	} else{
		fn( new Error("Parameters mismatch"), null);
	}
}


/*
var params = {
	subhabits: [Math.random(), Math.random(), Math.random()],
	user: config.firstUser.name,
	group: config.firstGroup._id,
	habit: config.habits[Math.floor(Math.random()*config.habits.length)].habit
};
saveHabit( params, function(err, data){
	if( err ) console.log( err );
	console.log( util.inspect( data, {colors: true} ) );
} );
*/


function habitsByUser( username, depth, fn ){
	// group=true&startkey=["ali"]&endkey=["ali",{}]
	var path = listhabitsbyuser+'?group_level='+depth+'&startkey=["'+ username +'"]&endkey=["'+username+'",{}]';
	console.log( path );
	dataDB( listhabitsbyuser+'?group_level='+depth+'&startkey=["'+ username +'"]&endkey=["'+username+'",{}]', function(err, data){
		if( err ){
			fn(err, null);
		} else{
			fn(null, data);
		}
	} );
}

function habitsByGroup( fn ){
	
}




////////////////////////////////////////////////////////////
//
// Tests
//
///////////////////////////////////////////////////////////////////////////

console.log( "---------------------------" );
// have been testing all along
// need to learn to write unit tests in a separate file



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


// Habits
exports.saveHabit = saveHabit;
exports.habitsByUser = habitsByUser;
exports.habitsByGroup = habitsByGroup;





// Have fun
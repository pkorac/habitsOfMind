#!/usr/bin/env node

var fs = require('fs'),
	util = require('util'),
	readline = require('readline'),
	couchrequest = require('couch-request'),
	bcrypt = require('bcrypt'),
	config = require('./config');
	




var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function clearDB( db, callback ){
	db( "_all_docs", function(err, results){
		if ( results ){
		
			var docsToDelete = { docs: [] };
			results.rows.forEach( function( row ){
				var doc = { _id: row.key, _rev: row.value.rev, _deleted:true };
				docsToDelete.docs.push( doc );
			} );
			
			
			db( '_bulk_docs', docsToDelete, function(err, data){
				if( data ){
					
					callback(null);
										
				} else{
					callback(new Error("Something went wrong with the clearing."));
				}
			} );
		} else{
			callback(new Error("Couldn't find anything here. Check the database url"));
		}						
	});
}



////////////////////////////////////////////////////////////////////////////////////////////////////

// STEP 0
// Prepare the databases
var creds = JSON.parse( fs.readFileSync( 'creds.json' ).toString() ); // database credentials
		var profilesDB = couchrequest( {databaseUrl: creds.profilesDB} ); // user profiles
		var dataDB = couchrequest( {databaseUrl: creds.dataDB} ); // user profiles

// STEP 1
// Ask to be sure
rl.question("Are you sure you want to clear the databases?\nThis will delete ALL the data (yes/no)", function(answer) {

	if ( answer === "yes" ){			
		rl.close();	
		console.log( ".\n.\n.\nOK deleting everything now\n." );		
		
		// STEP 2
		// Empty the user profiles database
		clearDB( profilesDB, function(err){
			if( err ){
				console.log( err );
				console.log("asdfasdf");
			} else{
				
				
				// STEP 3
				// Empty the user data database
				clearDB( dataDB, function(err){
					if( err ){
						console.log(err);
					} else{
						console.log("All the data cleared\n.");
						
						// STEP 4
						// Setup the initial user and the group
						var userAndGroup = {
							docs: [ config.firstUser, config.firstGroup ]	
						};
						var username = config.firstUser.name;
						var rndPass = bcrypt.genSaltSync(config.hashDepth);
						var rndPasswordhash = bcrypt.hashSync( rndPass, config.hashDepth );
						userAndGroup.docs[0].password = rndPasswordhash;
						
						profilesDB( "_bulk_docs", userAndGroup, function(err, response){
							if ( err ) {
								console.log( err );
							} else{
								console.log("First user and group created\n.");
								//console.log(".\nFirst user's password is: " + rndPass +"\n.");
								
								// STEP 5
								// Create views
								var views = {
									docs: [config.views.lists]	
								};
								profilesDB( "_bulk_docs", views, function(err, response){
									if( err ){
										console.log( err );
									} else{
									
										console.log( "Views generated\n." );										
										console.log( "and all your base are belong to us\n.\n." );
										
										
										console.log( "-------------------------" );
										console.log( "Done" );
										console.log( "You can now log-in with: ");
										console.log( "Username: " + username );
										console.log( "Password: " + rndPass );
										console.log( "-------------------------" );
									}
								});
							}
						});
					}
				});				
			}
		} );
		
		
	} else{
		rl.close();
		console.log( "\n.\nBailed out\n." );	
	}	
});








// Have fun
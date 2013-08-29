
var current_route = "/admin/admin/users/create/";
var path = current_route;
path = path.split("/");

console.log( path );
for ( var i = 0; i < path.length; i++ ){
	if ( path[i].length < 1 ){

	}
}

for ( var i = 2; i < path.length; i++ ){
	console.log( path.slice(0, i+1).join("/") );	
}

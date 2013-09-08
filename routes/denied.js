

module.exports = function(req,res){
	res.status(403);
	res.render( 'denied', { title: "Access denied", subtitle: "You are not alowed here" } );
};
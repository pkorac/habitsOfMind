

module.exports = function(req,res){
	res.status(404);
	res.render( '404', { title: "404", subtitle: "Computer says no…"} );
};
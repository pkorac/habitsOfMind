// External Modules
var express = require('express'),	
	flash = require('connect-flash');

var app = express();

// Local Modules
var config= require('./config'),
	auth = require('./auth'),
	db = require('./db');

////////////////////////////////////
// Middleware & Config
////////////////////////////////////
var port = process.env.PORT || 3003;

app.configure( function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
//	app.set('view cache', true );
	app.use( express.static('public') );
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.cookieSession( { secret: config.secret } )); // session expiry in 3 minutes

/*
	app.use(express.cookieSession({ secret: 'shakabum', 
							  cookie: { maxAge: 180000 } })); // session expiry in 3 minutes
*/
	app.use( flash() );
});


////////////////////////////////////
// Routes
////////////////////////////////////

var	routes = require('./routes')(app, config, auth);

////////////////////////////////////
app.listen(port);
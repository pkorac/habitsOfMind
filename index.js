// External Modules
var express = require('express'),	
	flash = require('connect-flash'),
	engine = require('ejs-locals');

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
	app.engine("ejs", engine);
//	app.set('view cache', true );
	app.use(express.compress());
	app.use( express.static('public') );
//	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.cookieSession( { secret: config.secret } )); // session expiry in 3 minutes
	app.use( flash() );
});


////////////////////////////////////
// Routes
////////////////////////////////////

// Set user locals
app.all('*', function(req,res,next){ auth.setUserLocals( req, res, next, app ); } );

// Move to https
app.get("*", function(req,res,next){	
	if( req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto']!='https' ){
	    res.redirect(config.url+req.url);
	} else{
		next();
	}
});

var	routes = require('./routes')(app, config, auth);

////////////////////////////////////
app.listen(port);
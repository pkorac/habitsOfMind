// External Modules
var express = require('express'),
	flash = require('connect-flash'),
	passport = require('passport');

var app = express();

// Local Modules
var auth = require('./auth'),
	db = require('./db');

////////////////////////////////////
// Middleware & Config
////////////////////////////////////
var port = process.env.PORT || 3003;
app.configure( function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use( express.static('bs') );
	
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'shakabum', 
							  cookie: { maxAge: 180000 } })); // session expiry in 3 minutes
	app.use(flash());	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);

});





////////////////////////////////////
// Routes
////////////////////////////////////
app.get('/', function(req, res ){
	res.render('index', { title: "Authentication example" } );
} );

app.get('/login', function(req, res){
	res.render('login', { message: req.flash('error') } );
});

app.get('/userarea', auth.authCheck, function(req,res){
	res.render('userarea', { title: "Authentication example" } );
});

app.get('/logout', auth.logout('/login') );

app.post('/login', auth.authenticate('/userarea', '/login') );





////////////////////////////////////
app.listen(port);
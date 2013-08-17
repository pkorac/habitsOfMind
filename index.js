// External Modules
var express = require('express'),	
	flash = require('connect-flash');

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
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.cookieSession({ secret: 'shakabum', 
							  cookie: { maxAge: 180000 } })); // session expiry in 3 minutes
	app.use( flash() );
});

var flasherror = 'error';



////////////////////////////////////
// Routes
////////////////////////////////////
// GET

// Https redirect
app.all('*', function(req,res,next){
	var stuff = req.host;
	stuff += " : " + req.originalUrl;
	if ( !req.secure ) stuff += "<br/> NOT SECURE";
	res.send( stuff );
});

// Carry on
app.get('/', function(req, res ){
	res.render('index', { title: "Authentication start" } );
} );

app.get('/login', function(req, res){
	
	res.render('login', { message: req.flash( flasherror ) } );
});

app.get('/studentarea', auth.check, function(req,res){
	res.render('studentarea', { title: "Students authenticated" } );
});

app.get('/teacherarea', auth.check, function(req,res){
	res.render('teacherarea', { title: "Teacher authenticated" } );
});

app.get('/admin', auth.check, function( req, res ){
	res.render('admin', {title: "Authentication start" });
} );

app.get('/logout', auth.logout, function(req,res){
	res.send("Logged out");
} );

// POST
app.post('/login', auth.login, function(req, res){
	res.send("Logged in");
} );





////////////////////////////////////
app.listen(port);
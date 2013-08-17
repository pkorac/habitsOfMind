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
// GET
app.get('/', function(req, res ){
	res.render('index', { title: "Authentication start" } );
} );

app.get('/login', function(req, res){
	res.render('login', { message: req.flash('error') } );
});

app.get('/studentarea', auth.authCheck, function(req,res){
	res.render('studentarea', { title: "Students authenticated" } );
});

app.get('/teacherarea', auth.authCheck, function(req,res){
	res.render('teacherarea', { title: "Teacher authenticated" } );
});

app.get('/admin', auth.authCheck, function( req, res ){
	res.render('admin', {title: "Authentication start" });
} );

app.get('/logout', auth.logout('/') );

// POST
app.post('/login', auth.authenticate('/studentarea', '/login') );





////////////////////////////////////
app.listen(port);
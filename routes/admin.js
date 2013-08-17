var db = require('../db');

exports.landing = function( req, res ){
	res.render('admin/landing', {title: "Authentication start" });
};

exports.users = function( req, res ){
	res.render('admin/users', {users: db.listUsers() } );
};
var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM users";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('users', {title:'users Available', action:'list', sampleData:data});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("users", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_users", function(request, response, next){

	var UserID = request.body.UserID;

	var username = request.body.username;

	var master_user = request.body.master_user;

	var query = `
	INSERT INTO users 
	(UserID, username, master_user) 
	VALUES ("${UserID}", "${username}", "${master_user}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/users");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM users WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('users', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var UserID = request.body.UserID;

	var username = request.body.username;

	var master_user = request.body.master_user;

	var query = `
	UPDATE users 
	SET UserID = "${UserID}", 
	username = "${username}", 
	master_user = "${master_user}", 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/users');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM users WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/users");
		}

	});

});

module.exports = router;



var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM user_devices";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('user_devices', {title:'user_devices Available', action:'list', sampleData:data});
		}

	});

});


// router.get('/search', (request, response) => {

// 	const query = request.query.q;

// 	var sql = '';

// 	if(query != '')
// 	{
// 		sql = `SELECT * FROM user_devices WHERE serial_number LIKE '%${query}%' OR mobile_name LIKE '%${query}%' OR model LIKE '%${query}% OR username LIKE '%${query}%'`;
// 	}
// 	else
// 	{
// 		sql = `SELECT * FROM user_devices`;
// 	}

// 	pool.query(sql, (error, results) => {

// 		if (error) throw error;

// 		response.send(results);

// 	});

// });

router.get("/add", function(request, response, next){

	response.render("user_devices", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_user_devices", function(request, response, next){

	var serial_number = request.body.serial_number;

	var mobile_name = request.body.mobile_name;

	var model = request.body.model;

	var username = request.body.username;

	var query = `
	INSERT INTO user_devices 
	(serial_number, mobile_name, model, username) 
	VALUES ("${serial_number}", "${mobile_name}", "${model}", "${username}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/user_devices");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM user_devices WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('user_devices', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var serial_number = request.body.serial_number;

	var mobile_name = request.body.mobile_name;

	var model = request.body.model;

	var username = request.body.username;



	var query = `
	UPDATE user_devices 
	SET serial_number = "${serial_number}", 
	mobile_name = "${mobile_name}", 
	model = "${model}", 
	username = "${username}",
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/user_devices');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM user_devices WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/user_devices");
		}

	});

});

module.exports = router;



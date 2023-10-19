var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM devices";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('assets', {title:'Assets Available', action:'list', sampleData:data});
		}

	});

});


router.get('/search', (request, response) => {

	const query = request.query.q;

	var sql = '';

	if(query != '')
	{
		sql = `SELECT * FROM devices WHERE serial_number LIKE '%${query}%' OR mobile_name LIKE '%${query}%' OR model LIKE '%${query}% OR status LIKE '%${query}%'`;
	}
	else
	{
		sql = `SELECT * FROM devices`;
	}

	pool.query(sql, (error, results) => {

		if (error) throw error;

		response.send(results);

	});

});

router.get("/add", function(request, response, next){

	response.render("assets", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_assets", function(request, response, next){

	var serial_number = request.body.serial_number;

	var mobile_name = request.body.mobile_name;

	var model = request.body.model;

	var status = request.body.status;

	var comments = request.body.comments;

	var query = `
	INSERT INTO devices 
	(serial_number, mobile_name, model, status, comments) 
	VALUES ("${serial_number}", "${mobile_name}", "${model}", "${status}", "${comments}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/assets");
		}

	});

});

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM devices WHERE id = "${id}"`;

	database.query(query, function(error, data){

		response.render('assets', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var serial_number = request.body.serial_number;

	var mobile_name = request.body.mobile_name;

	var model = request.body.model;

	var status = request.body.status;

	var comments = request.body.comments;


	var query = `
	UPDATE devices 
	SET serial_number = "${serial_number}", 
	mobile_name = "${mobile_name}", 
	model = "${model}", 
	status = "${status}",
	comments = "${comments}"  
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/assets');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM devices WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/assets");
		}

	});

});

module.exports = router;



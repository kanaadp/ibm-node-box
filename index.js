var express = require('express');
var http = require('http');
var querystring = require('querystring');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

	response.render('pages/index');
});

app.post('/test', function(request, response) {
	console.log("mmmm!");
	console.log(request.method);
	console.log(request.url);
	response.statusCode = 200;
	response.render("pages/index");
});

app.get('/test', function(request, response) {
	console.log("yo!");
	console.log(request.method);
	console.log(request.url);
	response.statusCode = 200;
	response.render("pages/index");
});

app.post('/fire', function(request, response) {
	console.log("hi!");
	console.log(request.method);
	console.log(request.url);
	console.log(request.body.file_name);
	console.log(request.body.file_id);
	console.log(request.body.user_name);
	console.log(request.body.user_id);
	console.log(request.body.auth_code);
	console.log(request.body.service);
	response.end();
});

app.post('/auth', function(request, response) {
	console.log("ayyyy!");
	var data = querystring.stringify({
		response_type: 'code',
		redirect_uri: 'https://glacial-thicket-87017.herokuapp.com/auth',
		client_id : '5rse5hy8n9hqu8xh62d45hns3d61vm4v',
		state: '2q20NI'

	});

	var options = {
		host: 'account.box.com',
		path: '/api/oauth2/authorize',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log("body: " + chunk);
		});
	});

	req.write(data);
	req.end();
	console.log("done!");
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});



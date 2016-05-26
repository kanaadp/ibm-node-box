var express = require('express');
var app = express();
var http = require('http');

var bodyParser = require('body-parser');

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
	var options = {
		host: 'account.box.com',
		path: '/api/oauth2/authorize',
		method: 'GET'
	};

	var callback = function(response) {
		var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
  	str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
  	console.log(str);
  });
}
var req = http.request(options, callback);
console.log("mmmmmmmmmm");
req.write("response_type=&client_id=5rse5hy8n9hqu8xh62d45hns3d61vm4v&state=2q20NI&redirect_uri=www.google.com");
response.end();
console.log("o man");
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

app.get('/auth', function(request, response) {
	console.log("ayyyy!");
	var options = {
		host: 'account.box.com',
		path: '/api/oauth2/authorize',
		method: 'GET'
	};

	var callback = function(response) {
		var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
  	str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
  	console.log(str);
  });
}
var req = http.request(options, callback);
console.log("mmmmmmmmmm");
req.write("response_type=&client_id=5rse5hy8n9hqu8xh62d45hns3d61vm4v&state=2q20NI&redirect_uri=www.google.com");
response.end();
console.log("o man");
});

app.post('/auth', function(request, response) {
	console.log("same!");
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


//not being used!
app.get('/fire', function(request, response) {
	console.log("hello!");
	console.log(request.method);
	console.log(request.url);
	response.statusCode = 200;
	response.render("pages/index");
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});



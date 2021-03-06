var express = require('express');
var http = require('http');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var req = require('request');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var limitedAccessToken = "";
var fullAccessToken = "";

//FIRST (Preliminary callback URL)
app.post('/prelim', function(request, res) {
	console.log("Post Request to preliminary callback URL");
	console.log("     " + request.method);
	console.log("     " + request.url);
	console.log("     " + request.body.file_name);
	console.log("     " + "File ID: " + request.body.file_id);
	console.log("     " + request.body.user_name);
	console.log("     " + "User ID: " +request.body.user_id);
	console.log("     " + "Received Metadata: " +request.body.metadata_1);
	console.log("Authenticating using auth code: " + request.body.auth_code);
	req({
		method: 'POST',
		uri: "https://api.box.com/oauth2/token",
		formData: {
			grant_type: 'authorization_code',
			code: request.body.auth_code,
			client_id: '5rse5hy8n9hqu8xh62d45hns3d61vm4v',
			client_secret: "B0h3s2QCP2XA97ciVuCnUh3WgJPa1O5U"
		}
	}, function(error, response, body) {
		//Callback printing file access token
		if (!error && response.statusCode == 200) {
			console.log("Limited Authentication successful!");
			var info = JSON.parse(body);
			console.log("     " + "Access Token: " + info.access_token);
			console.log("     " + "Refresh Token: " + info.refresh_token);
			limitedAuthToken = info.access_token;
			} else{
			console.log("Authentication failure!");
		}
	})
	res.end();
	
});
//SECOND (Client callback URL)
app.post('/client', function(request, response) {
	console.log("Post Request to client callback URL");
	response.end();
});

//Full Auth process (Client callback URL)
app.get('/fullAuth', function(request, response) {
	console.log("Starting full authentication");
	response.redirect("https://account.box.com/api/oauth2/authorize?response_type=code&client_id=5rse5hy8n9hqu8xh62d45hns3d61vm4v&state=2q20NI&redirect_uri=https://169.45.207.229/auth");

});

//AUTH callback
app.get('/auth', function(request, response) {
	console.log("great!");
	console.log(request.method);
	console.log(request.url);
	console.log(request.query.code);

	req({
		method: 'POST',
		uri: "https://api.box.com/oauth2/token",
		formData: {
			grant_type: 'authorization_code',
			code: request.query.code,
			client_id: '5rse5hy8n9hqu8xh62d45hns3d61vm4v',
			client_secret: "B0h3s2QCP2XA97ciVuCnUh3WgJPa1O5U"
		}
	}, function(error, response, body) {
		//Callback printing access toekn
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log(info.access_token);
			console.log(info.refresh_token);
		}
	})

	response.statusCode = 200;
	response.render("pages/index", {limited : limitedAccessToken, full: fullAccessToken});
	console.log("done!");
});

//Callback after authorization has been processed
app.get('/test', function(request, response) {
	console.log("yo!");
	console.log(request.method);
	console.log(request.url);
	response.end();
});

//SECOND (Client callback URL)
app.get('/info', function(request, response) {
	console.log("Post Request to client callback URL");
	console.log("Rendering landing page");
	response.write("limitedAccessToken" + limitedAccessToken);
	response.write("fullAccessToken" + fullAccessToken);
	response.end();
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


//Webhook callbacks
app.post('/webhook', function(request, response) {
	console.log("webhook post request received!");
	console.log(request.method);
	console.log(request.url);
	response.end();
});

app.get('/webhook', function(request, response) {
	console.log("webhook get request received!!");
	console.log(request.method);
	console.log(request.url);
	response.statusCode = 200;
	response.end();
});
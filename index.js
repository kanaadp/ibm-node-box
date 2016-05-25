var express = require('express');
var app = express();

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



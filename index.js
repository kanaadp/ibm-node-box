var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

  response.render('pages/index');
});

app.post('/test', function(request, response) {
  console.log("hello!");
  console.log(request.method);
  console.log(request.url);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.render("pages/index");
  response.end();
});

app.get('/test', function(request, response) {
  console.log("hi!");
  console.log(request.method);
  console.log(request.url);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.render("pages/index");
  response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



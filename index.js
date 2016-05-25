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
  console.log(request.headers);
  response.write('<html>');
	response.write('<body>');
	response.write('<h1>Hello, World!</h1>');
	response.write('</body>');
	response.write('</html>');
	response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



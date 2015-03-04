// external requires
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var hbs = require('hbs');

require('newrelic');

var controller = require('./controller');

// kick off the app
var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

// port config
app.set('port', process.env.PORT || 5000);

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(path.join(__dirname, 'public')));

// app routes

app.get('/img/:width/:height', controller.showRandomImage);
app.get('/img/:width/', controller.showRandomImage);
app.get('/img', controller.showRandomImage);

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});
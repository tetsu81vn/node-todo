/**
 *
 * @author lethanhhung@gmail.com
 *
 */

// set up ========================
var express = require('express');
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var port = process.env.PORT || 8080;
var fs = require('fs');
var path = require('path');

// configuration =====================
var database = require('./config/database');
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride(''));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// load the routes
require('./app/routes.js')(app);


// listen (start app with node server.js) ========================
app.listen(port);
console.log("App listening on port " + port);
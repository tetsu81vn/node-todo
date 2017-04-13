/**
 *
 * @author lethanhhung@gmail.com
 *
 */

// set up ========================
    var express = require('express');
    var app = express();
    var mongoose = require('mongoose');
    var morgan = require("morgan");
    var bodyParser = require("body-parser");
    var methodOverride = require("method-override");
    var fs = require('fs');
    var path = require('path');

// configuration =====================
    mongoose.connect('mongodb://todo:123456@localhost:27017/admin');

    app.use(express.static(__dirname + '/public'));

    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({type:'application/vnd.api+json'}));
    app.use(methodOverride(''));

    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'});

    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));

    app.get('/', function (req, res) {
        res.send('hello, world!');
    })

    // listen (start app with node server.js) ========================
    app.listen(8080);
    console.log("App listening on port 8080");


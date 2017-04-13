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
    mongoose.connect('mongodb://todo:123456@localhost:27017/todo?authSource=admin');

    app.use(express.static(__dirname + '/public'));

    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({type:'application/vnd.api+json'}));
    app.use(methodOverride(''));

    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'});

    // setup the logger
    app.use(morgan('combined', {stream: accessLogStream}));

    //  define model ==============
    var Todo = mongoose.model('Todo', {
        text : String
    });

    // routes ====================

    // api -----------------
    // get all todos
    app.get('/api/todos', function(req, res){
        // use mongoose to get all todos in database
        Todo.find(function(err, todos){
            if (err) {
                res.send(err);
            }

            res.json(todos);
        });
    });

    // create todo and send bak all todos after creation

// create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });


    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res){
        Todo.remove({_id : req.params.todo_id}, function(err, todo){
            if (err) {
                res.send(err);
            }
        });

        // get and return all todos after deletion
        Todo.find(function(err, todos){
            if (err) {
                res.send(err);
            }

            res.json(todos);
        });
    });


    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

    // listen (start app with node server.js) ========================
    app.listen(8080);
    console.log("App listening on port 8080");
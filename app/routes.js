
// load the todo model
var Todo = require('./models/todo');
// routes ====================

// api -----------------
// // expose the routes to our app with module.exports
module.exports = function(app) {
    // get all todos
    /**
     * @param  {[request]}
     * @param  {[response]}
     * @return {[json]}
     */
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
                    res.send(err);
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
        res.sendFile(__dirname + '/public/index.html');
    });
};
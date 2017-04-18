/**
 * Created by lethanhhung@gmail.com on 4/13/2017.
 */

    var todoModule = angular.module('todoModule', []);

    function mainController($scope, $http) {
        $scope.formData = {};

        // landing page, get all todos
        $http.get('/api/todos')
            .success(function(data){
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error:" + data);
            });

        // create todo from form submitting
        $scope.createTodo = function() {
            $http.post('api/todos', $scope.formData)
                .success(function(data){
                    $scope.formData = {}; // reset form
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log("Error:" + data);
                });
        };

        // delete todo
        $scope.deleteTodo = function(id) {
            $http.delete('/api/todos/' + id)
                .success(function(data){
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };


    }
(function(w) {
  function TodoController($scope, $compile, $sce, $window) {
    $scope.globalObj = function(){
      return JSON.stringify(($window.ExectualsObj || {}), null, 4)
    }
    $scope.todos = [
      { text: "learn angular", done: true },
      { text: "build an angular app", done: false }
    ];

    $scope.addTodo = function() {
      $scope.todos.push({ text: $scope.todoText, done: false });
      $scope.todoText = "";
    };

    $scope.remaining = function() {
      var count = 0;
      angular.forEach($scope.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    $scope.archive = function() {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) $scope.todos.push(todo);
      });
    };
  }
  var ngModule = w.angular.module("common.container", []);
  ngModule.controller("TodoController", [
    "$scope",
    "$compile",
    "$sce",
    "$window",
    TodoController
  ]);
  ngModule.directive("todoDir", function() {
    var directive = {};
    directive.restrict = "E"; /* restrict this directive to elements */
    directive.template = `
            <pre>
                {{globalObj()}}
            </pre>

            <h2>Todo</h2>
			  <div ng-controller="TodoController">
				<span>{{remaining()}} of {{todos.length}} remaining</span>
				[ <a href="" ng-click="archive()">archive</a> ]
				<ul class="unstyled">
				  <li ng-repeat="todo in todos">
					<input type="checkbox" ng-model="todo.done" />
					<span class="done-{{todo.done}}">{{todo.text}}</span>
				  </li>
				</ul>
				<form ng-submit="addTodo()">
				  <input
					type="text"
					ng-model="todoText"
					size="30"
					placeholder="add new todo here"
				  />
				  <input class="btn-primary" type="submit" value="add" />
				</form>
			  </div>`;

    return directive;
  });
  w.angular.bootstrap(document.getElementById("bootstrap_id"), [
    "common.container"
  ]);
})(window);

angular.module('async.mainController', ['ui.bootstrap'])

.controller('MainController', ['$scope', '$uibModal', function($scope, $uibModal) {
  $scope.openForm = function() {
    $uibModal.open({
      templateUrl: 'client/postForm/postForm.html',
      controller: 'FormController'
    });
  };
}]);




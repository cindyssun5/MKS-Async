angular.module('async.providerController', ['ui.bootstrap'])

.controller('ProviderController', ['$scope', '$uibModal', 'Ads', 'SignInState', 'Auth', '$location', function($scope,
  $uibModal, Ads, SignInState, Auth, $location){

   $scope.openForm = function() {
      $uibModal.open({
        templateUrl: 'client/postForm/postForm.html',
        controller: 'FormController'
      });
    };

    $scope.ads={};

    $scope.status = {
      authData: null
    };

    $scope.myFilter = function(post){
      console.log('FINDME', $scope.id);
      return post.UID === Auth.$getAuth().uid;
    };

    $scope.saveAuthStatus = function(){
      $scope.authData = SignInState.authData;
      $scope.id = $scope.authData.uid;
      $scope.email = $scope.authData.email;
      console.log('SignInState.authData: ', SignInState.authData);
      console.log('$scope.authData: ', $scope.authData);
      console.log('$scope.id: ', $scope.id);
      console.log('$scope.email :', $scope.email);
    };



    $scope.logout = function() {
      $scope.auth = Auth;
      $scope.auth.$signOut();
      $location.path('/');

    };

    $scope.getAds = function(){

        Ads.getAds()
          .then(function(data) {
            console.log(JSON.stringify(data));
            $scope.ads = data;
          })
          .catch(function(err) {
            console.error(err);
          });

    };

    Auth.$onAuthStateChanged(function(authData) {
      // console.log("authData1: ", authData);
      // console.log("SignInState.authData1: ", SignInState.authData);
      SignInState.authData = authData;
      // console.log("authData2: ", authData);
      // console.log("SignInState.authData2: ", SignInState.authData);
    });

}]);

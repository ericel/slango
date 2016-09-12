'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('LoginCtrl', function ($scope, $location, authService, currentAuth) {
    if (currentAuth) {
      $location.path('/');
     } 
  	 $scope.login = function() {
      $scope.error = null;
      //$scope.loginemail
      //$scope.loginpassword
      authService.login('ericel123@gmail.com', 'yaounde')
      .then(function(authData) {
        //$scope.authData = userAuth.getUserData();
        $location.path('/');
        ///console.log($scope.authData);
      }).catch(function(error) {
        $scope.error = error.message;
      });
    };
  });

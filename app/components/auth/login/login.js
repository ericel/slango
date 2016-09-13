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
    $scope.$parent.seo = {
        pageTitle : 'Log in To Slango',
        pageDescripton: 'Log in to slango'
    };
    if (currentAuth) {
      $location.path('/');
     } 
  	 $scope.login = function() {
      $scope.error = null;
      //$scope.loginemail
      //$scope.loginpassword
      authService.login($scope.loginemail, $scope.loginpassword)
      .then(function(authData) {
        //$scope.authData = userAuth.getUserData();
        $location.path('/');
        ///console.log($scope.authData);
      }).catch(function(error) {
        $scope.error = error.message;
      });
    };
  });

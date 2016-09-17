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
      if($scope.form.$invalid){
        $scope.error = "Make sure you fill all form fields!";
        return;
      }

      authService.login($scope.loginemail, $scope.loginpassword)
      .then(function(authData) {
 
        $location.path('/');
    
      }).catch(function(error) {
        $scope.error = error.message;
      });
    };
  });

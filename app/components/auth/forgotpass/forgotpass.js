'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:ForgotpassCtrl
 * @description
 * # ForgotpassCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('ForgotpassCtrl', function ($scope, authService, firebaseService, $interval, currentAuth) {
    var vm = this;
    if(currentAuth){
      authService.signOutUser();
    }
    $scope.pleasewait = false;
    $scope.hideform = false;
    $scope.forgotPass = function(){
      if($scope.form.$invalid){
	    	$scope.error = "Make sure you enter your account email!";
	    	return;
	   }
      $scope.pleasewait = true;
      authService.resetPass($scope.uemail)
	    .then(function(user){ 
	    	$scope.hideForm = true;
	    }).catch(function(error){
	       $scope.pleasewait = false;
           $scope.error =  error.message;
	    });
    };
  });

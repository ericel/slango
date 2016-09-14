'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('AddCtrl', function ($scope, md5, firebaseService, currentAuth, authService) {
  	 $scope.$parent.seo = {
        pageTitle : 'Add a slang',
        pageDescripton: 'Increase the slang dictionary'
    };
    var vm = this;
    vm.getDatetime = new Date().toJSON();

     vm.auth = authService.isLoggedIn();
    $scope.hideForm = false;
    vm.auth.$onAuthStateChanged(function(user) {
    $scope.slangoUser = user;
    vm.slangID = md5.createHash('hello'+vm.getDatetime+$scope.slangoUser);
    $scope.addSlango = function(){
	    if($scope.form.$invalid){
	    	$scope.error = "Make sure you fill all form fields!";
	    	return;
	    }
	    firebaseService.addSlang(vm.slangID, $scope.slango, $scope.defineSlang, $scope.exSentences, $scope.slangoUser.uid, vm.getDatetime);
	    $scope.hideForm = true;
    }
	});
  });

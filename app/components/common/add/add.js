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
    vm.auth = authService.isLoggedIn();
    $scope.hideForm = false;
    vm.auth.$onAuthStateChanged(function(user) {
    $scope.slangoUser = user;
    
    $scope.addSlango = function(){
	    if($scope.form.$invalid){
	    	$scope.error = "Make sure you fill all form fields!";
	    	return;
	    }
       var unique = true;
      firebaseService.getSlangs().on('value', function(response) {
         vm.slangs = response.val();
           
          for (var keys in vm.slangs) {
              var getThisObject = vm.slangs[keys];
              if (getThisObject.slang.toLowerCase() === $scope.slango.toLowerCase()) {
                  $scope.error = "There is a slang with that name!";
                  unique = false;
                  break;
              }
          }
        if (unique) {
          vm.getDatetime = new Date().toJSON();
          vm.slangID = md5.createHash('hello'+vm.getDatetime+$scope.slangoUser);
          firebaseService.addSlang(vm.slangID, $scope.slango, $scope.defineSlang, $scope.exSentences, $scope.slangoUser.uid, vm.getDatetime).then(function(){
          $scope.hideForm = true;
           });
        }
      });
     
    }
  });
});
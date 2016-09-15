'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('SearchCtrl', function ($scope, $stateParams, firebaseService, indexDBService) {
  	var vm = this;
    vm.search_term = $stateParams.search;
    vm.search_term = vm.search_term.replace(/\-+/g, ' ').toLowerCase();
     $scope.$parent.seo = {
        pageTitle : vm.search_term,
        pageDescripton: 'You are searching slango for' + vm.search_term
    };
    if (navigator.onLine) {
    firebaseService.getSlangs().on('value', function(response) {
      var myObject = response.val();
        function findByName(name) {
      var thisObject = [];
      for (var keys in myObject) {
        var getThisObject = myObject[keys];
        if ((getThisObject.slang).toLowerCase().indexOf(name) !== -1 ) {
          thisObject.push(myObject[keys]);
        }
      }
      return thisObject
    }
    var getMyObject = findByName(vm.search_term);

    vm.searchObj = getMyObject;
    if((vm.searchObj).length < 1){
      $scope.haveResults = true;
          $scope.message = "Nothing found! Modify your search!";
    }
     });
  } else {
     indexDBService.getVobj().then(function(vObj){
      var myObject = vObj;
        function findByName(name) {
      var thisObject = [];
      for (var keys in myObject) {
        var getThisObject = myObject[keys];
        if ((getThisObject.slang).toLowerCase().indexOf(name) !== -1 ) {
          thisObject.push(myObject[keys]);
        }
      }
      return thisObject
    }
    var getMyObject = findByName(vm.search_term);

    vm.searchObj = getMyObject;
    if((vm.searchObj).length < 1){
      $scope.haveResults = true;
          $scope.message = "Nothing found! Modify your search!";
    }  
  });
 }
	  
    
  })
  .filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/\s+/g, '-').toLowerCase();
    };
}])

'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('HomeCtrl', function ($scope,  $sce, $timeout, firebaseService, currentAuth, indexDBService) {
    var vm = this;
      $scope.$parent.seo = {
        pageTitle : 'World of slangs',
        pageDescripton: 'World Slangs Database'
    };
   if (navigator.onLine) {
    firebaseService.getSlangs().on('value', function(response) {
      vm.slangs = response.val();
     });
  } else {
    indexDBService.getVobj().then(function(vObj){
      vm.slangs = vObj;
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
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

    indexDBService.getVobj().then(function(vObj){
      vm.slangs = vObj;
      if(vm.slangs.length === 0) {
        firebaseService.getSlangs().then(function(response) {
            vm.slangs = response.data;
            
        });
      }
    });
  })
  .filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/\s+/g, '-').toLowerCase();
    };
}])
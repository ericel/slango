'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('HomeCtrl', function ($scope, $sce, $timeout, firebaseService, currentAuth, indexDBService) {
    var vm = this;
      $scope.$parent.seo = {
        pageTitle : 'World of slangs',
        pageDescripton: 'World Slangs Database'
    };

    $scope.loaded = false;
  if (navigator.onLine) {
    var addToSlangs = [];
    firebaseService.getSlangs().on('value', function(response) {
     // vm.slangs = response.val();
      var userSlangs = response.val();
        for (var key in userSlangs) {
        if (userSlangs.hasOwnProperty(key)) {
           var slang = {"slang": userSlangs[key].slang, "slangDefine": userSlangs[key].slangDefine, "slangExample": userSlangs[key].slangExample, "user_id": userSlangs[key].user_id, "time_date": userSlangs[key].time_date, "file_dislikes": userSlangs[key].file_dislikes, "file_likes": userSlangs[key].file_likes, "slangID": userSlangs[key].slangID}
        addToSlangs.push(slang);
        }
      }
      vm.slangs = addToSlangs;
      $scope.loaded = true;
     });
  } else {
    indexDBService.getVobj().then(function(vObj){
      vm.slangs = vObj;
      $scope.loaded = true;
    });
  }
   $scope.criteriaMatch = function( letter) {
      return function( item ) {
       return item.slang.startsWith(letter);
       };
    };
  })
  .filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/\s+/g, '-').toLowerCase();
    };
}])
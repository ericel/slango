'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('FooterCtrl', function ($scope, $mdToast, $timeout) {
     var last = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.showSimpleToast = function(toast) {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(toast)
        .position(pinTo )
        .hideDelay(3000)
    );
  };
  if(ntstatus !== " "){
  $timeout(function(){
 
  	$scope.showSimpleToast(ntstatus); 
  }, 15000);
 }


  });

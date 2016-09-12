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
  }, 5000);
 }
 // TODO : Give A Service Worker Refresh For New Content
 /* $scope.showActionToast = function() {
    var pinTo = $scope.getToastPosition();
    var toast = $mdToast.simple()
      .textContent('Marked as read')
      .action('UNDO')
      .highlightAction(true)
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position(pinTo);

    $mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        alert('You clicked the \'UNDO\' action.');
      }
    });
  };*/
  $scope.$watch('online', function(newStatus) {
  	console.log('you are Online');
   });
  $scope.$watch('offline', function(newStatus) {
  	console.log('you are offline');
   });
  });

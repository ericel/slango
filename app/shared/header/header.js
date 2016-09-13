'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('HeaderCtrl', function ($scope, $state, $location, $timeout, $mdSidenav, $log, authService, $interval) {
     var vm = this;

    //$scope.error = "Enter a better search term";
    $scope.searchSlango = function(searchString){
       if (searchString == undefined) {
            return;
        }
      if(searchString.length < 3){
        $scope.error = "Enter a better search term";
        return;
      }

       $state.go('search', { search: searchString.replace(/\s+/g, '-').toLowerCase() });
    }

    vm.auth = authService.isLoggedIn();
  
    vm.auth.$onAuthStateChanged(function(user) {
      $scope.slangoUser = user;
     $scope.testImage = function(url, timeoutT) {
        return new Promise(function(resolve, reject) {
          var timeout = timeoutT || 5000;
          var timer, img = new Image();
          img.onerror = img.onabort = function() {
              clearTimeout(timer);
              //reject("error");
               $scope.userUrlImg = './images/avatar.png';
          };
          img.onload = function() {
               clearTimeout(timer);
               resolve("success");
               $scope.userUrlImg = url;
          };
          timer = $interval(function() {
              //reject("timeout");
          }, timeout); 
          img.src = url;
        });
    };
    if( $scope.slangoUser){
     $scope.testImage($scope.slangoUser.photoURL);
    }
     
    });

     $scope.signOutUser = function() {
          authService.signOutUser();
           $location.path('/login');
     };

    $scope.settings = [
    { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
    { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
   ];


     /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
   

    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };


    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
    /*$.getJSON("https://slango-a0034.firebaseio.com/user-videos.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    });*/
  });


'use strict';

/**
 * @ngdoc overview
 * @name slangoApp
 * @description
 * # slangoApp
 *
 * Main module of the application.
 */
angular
  .module('slangoApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngMaterial',
    'angular-loading-bar',
    'ngMdIcons',
    'firebase',
    'ngMd5',
    'indexedDB',
    'offline'
  ])
   .factory("Auth", ["$firebaseAuth",
      function($firebaseAuth) {
        return $firebaseAuth();
      }
    ])
   .run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("home");
    }

  });
 }])
   .config(function ($indexedDBProvider) {
    $indexedDBProvider
      .connection('slango')
      .upgradeDatabase(1, function(event, db, tx){
        var objStore = db.createObjectStore('userSlangs', {keyPath: 'slang'});
        var objStore = db.createObjectStore('slangComments', {keyPath: 'commentID'});
      });
  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
  }])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('purple', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
}).run(function (offline, $http, connectionStatus, $log, $rootScope) {
  offline.start($http);
  connectionStatus.$on('offline', function () {
    $log.info('We are now offline');
   $rootScope.online = false;

  });
   connectionStatus.$on('online', function () {
    $log.info('We are now online');
     $rootScope.online = true;
  });

  
});

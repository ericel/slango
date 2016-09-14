'use strict';

/**
 * @ngdoc overview
 * @name slangoApp
 * @description
 * # slangoApp
 *
 * Main module of the application.
 */
angular.module('slangoApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider,  $locationProvider){

    // any unknown URLS go to 404
    $urlRouterProvider.otherwise('/404');
    // no route goes to index
    $urlRouterProvider.when('', '/');
    // use a state provider for routing
    $locationProvider.hashPrefix('!')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'components/common/home/home.html',
            controller: "HomeCtrl as slang",
          resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForSignIn();
          }]
        }
        })
        .state('404', {
            url: '/404',
            templateUrl: 'shared/404.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/common/about/about.html',
            controller: 'AboutCtrl as slang',
        })
        .state('search', {
            url: '/search/:search',
            templateUrl: 'components/common/search/search.html',
            controller: 'SearchCtrl as slang',
        })
        .state('signup', {
        url: '/signup',
        templateUrl: 'components/auth/signup/signup.html',
        controller: 'SignupCtrl as slang',
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
      ,
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/auth/login/login.html',
        controller: 'LoginCtrl',
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
      })
      .state('user', {
        url: '/user/:uid/:user',
        templateUrl: 'components/auth/user/user.html',
        controller: 'UserCtrl as slang',
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
      })
      .state('add', {
        url: '/add',
        templateUrl: 'components/common/add/add.html',
        controller: 'AddCtrl as slang',
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
      })
       .state('slang', {
        url: '/slang/:sid/:title',
        templateUrl: 'components/common/slang/slang.html',
        controller: 'SlangCtrl as slang',
        resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$waitForSignIn();
        }]
      }
      });
}]);
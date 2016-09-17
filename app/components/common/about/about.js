'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('AboutCtrl', function () {
  	$scope.$parent.seo = {
        pageTitle : 'About us',
        pageDescripton: 'World\'s Slang Wiki'
    };
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

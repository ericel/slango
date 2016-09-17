'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:TermsCtrl
 * @description
 * # TermsCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('TermsCtrl', function () {
  	$scope.$parent.seo = {
        pageTitle : 'Terms of use',
        pageDescripton: 'Make Sure you brush befor using slango'
    };
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

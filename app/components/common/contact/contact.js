'use strict';

/**
 * @ngdoc function
 * @name slangoApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the slangoApp
 */
angular.module('slangoApp')
  .controller('ContactCtrl', function () {
  	$scope.$parent.seo = {
        pageTitle : 'Contact us',
        pageDescripton: 'Have any inquiries?'
    };
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

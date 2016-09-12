'use strict';

describe('Controller: SlangCtrl', function () {

  // load the controller's module
  beforeEach(module('slangoApp'));

  var SlangCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SlangCtrl = $controller('SlangCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SlangCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: ForgotpassCtrl', function () {

  // load the controller's module
  beforeEach(module('slangoApp'));

  var ForgotpassCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotpassCtrl = $controller('ForgotpassCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ForgotpassCtrl.awesomeThings.length).toBe(3);
  });
});
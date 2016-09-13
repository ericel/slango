'use strict';

describe('Service: indexDBService', function () {

  // load the service's module
  beforeEach(module('slangoApp'));

  // instantiate service
  var indexDBService;
  beforeEach(inject(function (_indexDBService_) {
    indexDBService = _indexDBService_;
  }));

  it('should do something', function () {
    expect(!!indexDBService).toBe(true);
  });

});

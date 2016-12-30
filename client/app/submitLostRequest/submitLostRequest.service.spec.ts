'use strict';

describe('Service: submitLostRequest', function() {
  // load the service's module
  beforeEach(module('webdevApp.submitLostRequest'));

  // instantiate service
  var submitLostRequest;
  beforeEach(inject(function(_submitLostRequest_) {
    submitLostRequest = _submitLostRequest_;
  }));

  it('should do something', function() {
    expect(!!submitLostRequest).to.be.true;
  });
});

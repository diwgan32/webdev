'use strict';

describe('Controller: LostPageCtrl', function() {
  // load the controller's module
  beforeEach(module('webdevApp.lostPage'));

  var LostPageCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    LostPageCtrl = $controller('LostPageCtrl', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });

});

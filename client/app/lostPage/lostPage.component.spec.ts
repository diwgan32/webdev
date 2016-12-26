'use strict';

describe('Component: LostPageComponent', function() {
  // load the controller's module
  beforeEach(module('webdevApp.lostPage'));

  var LostPageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LostPageComponent = $componentController('lostPage', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

'use strict';

describe('Component: LostPageMapComponent', function() {
  // load the controller's module
  beforeEach(module('webdevApp.lostPageMap'));

  var LostPageMapComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LostPageMapComponent = $componentController('lostPageMap', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

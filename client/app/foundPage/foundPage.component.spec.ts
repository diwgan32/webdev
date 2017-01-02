'use strict';

describe('Component: FoundPageComponent', function() {
  // load the controller's module
  beforeEach(module('webdevApp.foundPage'));

  var FoundPageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FoundPageComponent = $componentController('foundPage', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

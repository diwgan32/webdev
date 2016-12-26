'use strict';

describe('Component: lostPage', function() {
  // load the component's module
  beforeEach(module('webdevApp.lostPage'));

  var lostPageComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    lostPageComponent = $componentController('lostPage', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

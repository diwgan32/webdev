'use strict';

describe('Component: LostPageDescriptionComponent', function() {
  // load the controller's module
  beforeEach(module('webdevApp.lostPageDescription'));

  var LostPageDescriptionComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LostPageDescriptionComponent = $componentController('lostPageDescription', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});

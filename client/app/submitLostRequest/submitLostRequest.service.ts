'use strict';
const angular = require('angular');

/*@ngInject*/
export function submitLostRequestService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('webdevApp.submitLostRequest', [])
  .service('submitLostRequest', submitLostRequestService)
  .name;

'use strict';
const angular = require('angular');

/*@ngInject*/
export function lostPageController() {
  this.message = 'Hello';
}

export default angular.module('webdevApp.lostPage', [])
  .controller('LostPageController', lostPageController)
  .name;

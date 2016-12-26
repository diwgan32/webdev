'use strict';
const angular = require('angular');

export class lostPageComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('webdevApp.lostPage', [])
  .component('lostPage', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: lostPageComponent
  })
  .name;

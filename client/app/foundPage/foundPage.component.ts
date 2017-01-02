'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './foundPage.routes';

export class FoundPageComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('webdevApp.foundPage', [uiRouter])
  .config(routes)
  .component('foundPage', {
    template: require('./foundPage.html'),
    controller: FoundPageComponent,
    controllerAs: 'foundPageCtrl'
  })
  .name;

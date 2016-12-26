'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lostPage.routes';

export class LostPageComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('webdevApp.lostPage', [uiRouter])
  .config(routes)
  .component('lostPage', {
    template: require('./lostPage.html'),
    controller: LostPageComponent,
    controllerAs: 'lostPageCtrl'
  })
  .name;

  


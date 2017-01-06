'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import routes from './foundPage.routes';
import {FoundItemResource} from './founditems.service.ts';

export class FoundPageComponent {
  /*@ngInject*/
  FoundItem;
  constructor(FoundItem) {
    this.FoundItem = FoundItem;
  }
}

export default angular.module('webdevApp.foundPage', [uiRouter])
  .config(routes)
  .component('foundPage', {
    template: require('./foundPage.html'),
    controller: FoundPageComponent,
    controllerAs: 'foundPageCtrl'
  })
  .factory("FoundItem", FoundItemResource)
  .name;

'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lostPageMap', {
      url: '/lostPageMap',
      template: '<lost-page-map></lost-page-map>',
      authenticate: true
    });
}

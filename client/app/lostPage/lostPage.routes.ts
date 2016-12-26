'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lostPage', {
     url: '/lostPage',
     template: require('./lostPage.html'),
     authenticate: true
    });
}



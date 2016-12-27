'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lostPage', {
      url: '/lostPage',
      template: '<lost-page></lost-page>',
      authenticate:true
    });
}

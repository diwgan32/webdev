'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lostPageDescription', {
      url: '/lostPageDescription',
      template: '<lost-page-description></lost-page-description>'
      authenticate: true;
    });
}

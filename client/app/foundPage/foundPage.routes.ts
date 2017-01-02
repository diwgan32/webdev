'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('foundPage', {
      url: '/foundPage',
      template: '<found-page></found-page>'
    });
}

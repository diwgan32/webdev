'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lostPage.routes';

export class LostPageComponent {
  /*@ngInject*/
 
  constructor(NgMap, $scope) {
    $scope.lostItemName = "";
    $scope.lostItemDescription = "";
    $scope.numClick = 0;
    $scope.lat = [];
    $scope.long = [];

    NgMap.getMap().then(function(map) {
      map.setOptions({zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
      map.addListener('dblclick', function(event) {
        if($scope.numClick < 4){
          $scope.lat.push(event.latLng.lat());
          $scope.long.push(event.latLng.lng());
          $scope.numClick++;    
          $scope.$apply();
        }
      })
      });
  }

}

export default angular.module('webdevApp.lostPage', [uiRouter, 'ngMap'])
  .config(routes)
  .component('lostPage', {
    template: require('./lostPage.html'),
    controller: LostPageComponent,
    controllerAs: 'lostPageCtrl'
  })
  .name;

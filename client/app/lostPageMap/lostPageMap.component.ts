'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lostPageMap.routes';

export class LostPageMapComponent {
  /*@ngInject*/
  $scope;
  $state;
  LostItemData;
  constructor(NgMap, $scope, $state, LostItemData) {
    this.$scope = $scope;
    this.$state = $state;
    $scope.lats = [];
    $scope.longs = [];
    $scope.numClick = 0;
    $scope.coordString = [String];
    $scope.items = ["asdf", "fd", "sdfd"];
    this.LostItemData = LostItemData;
    NgMap.getMap().then(function(map) {
            map.setOptions({
                zoomControl: false,
                scrollwheel: false,
                disableDoubleClickZoom: true
            });
            map.addListener('dblclick', function(event) {
                if ($scope.numClick < 4) {
                    $scope.lats.push(event.latLng.lat());
                    $scope.longs.push(event.latLng.lng());
                    $scope.coordString.push("["+event.latLng.lat()+","+event.latLng.lng()+"]");
                    $scope.numClick++;
                    $scope.$apply();
                }
            })
        });
  }

  isValid(){
    return (this.$scope.numClick > 0);
  }

  goToDescription(){
    this.LostItemData.set(this.$scope.lats, this.$scope.longs);
    this.$state.go("lostPageDescription");
  }
}

export default angular.module('webdevApp.lostPageMap', [uiRouter])
  .config(routes)
  .component('lostPageMap', {
    template: require('./lostPageMap.html'),
    controller: LostPageMapComponent,
    controllerAs: 'lostPageMapCtrl'
  })
  .name;

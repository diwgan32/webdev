'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lostPageDescription.routes';
import {LostItemResource} from '../../components/dataService/lostItem.service.ts'
export class LostPageDescriptionComponent {
  /*@ngInject*/
  LostItemData;
  lats = [];
  longs = [];
  LostItem;
  $scope;
  getCurrentUser: Function;
  $state;
  constructor(LostItemData, LostItem, $scope, Auth, $state) {
    this.$scope = $scope;
    $scope.lostItemName = "";
    $scope.lostItemDescription = "";
    this.LostItemData = LostItemData;
    this.lats = this.LostItemData.getLats();
    this.longs = this.LostItemData.getLongs();
    this.LostItem = LostItem;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$state = $state;
  }

  submitLostItems() {
        
            this.LostItem.save({
                    userName: this.getCurrentUser().email,
                    itemName: this.$scope.lostItemName,
                    itemDesc: this.$scope.lostItemDescription,
                    lats: this.lats,
                    longs: this.longs
                }).$promise
                .then((result) => {
                    this.$scope.lostItemName = "";
                    this.$scope.lostItemDescription = "";
                    this.$scope.lat = [];
                    this.$scope.long = [];
                    this.$state.go("lostPage");
                });
          

    }
}

export default angular.module('webdevApp.lostPageDescription', [uiRouter])
  .config(routes)
  .component('lostPageDescription', {
    template: require('./lostPageDescription.html'),
    controller: LostPageDescriptionComponent,
    controllerAs: 'lostPageDescriptionCtrl'
  })
  .factory('LostItem', LostItemResource)
  .name;

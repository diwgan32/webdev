'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {LostItemResource} from './lostItem.service.ts';
import routes from './lostPage.routes';

export class LostPageComponent {
  /*@ngInject*/
  $scope;
  LostItem;
  return_items = [];
  getCurrentUser: Function;

  constructor(NgMap, $scope, Auth, LostItem, $uibModal) {
    'ngInject';
    $scope.lostItemName = "";
    $scope.lostItemDescription = "";
    $scope.numClick = 0;
    $scope.lat = [];
    $scope.long = [];
    this.$scope = $scope;

    this.getCurrentUser = Auth.getCurrentUserSync;
    this.LostItem = LostItem;
    
    $scope.return_items = this.getLostItems();
    $scope.open = function (item, index) {
        
        var modalInstance = $uibModal.open({
            template: require('./myModal.html'),
            controller: 'ModalInstanceCtrl as vm',
            
            resolve: {
         passLat: function () {
           return item.lats;
         },
         passLong: function () {
           return item.longs;
         }
       }
           })
        };


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

  submitLostItems(form){
    
    this.LostItem.save({
      userName: this.getCurrentUser().email,
      itemName: this.$scope.lostItemName,
      itemDesc: this.$scope.lostItemDescription,
      lats: this.$scope.lat,
      longs: this.$scope.long
    })
    
  }

  getLostItems(){
    var list = [];

    this.LostItem.query().$promise
    .then( (data) => {
      for(let datum of data){
        if(datum.userName == this.getCurrentUser().email){
          list.push(datum);
        }
      }
    });
    return list;
  }

  handleClick(item){

    this.$scope.open(item);
  }
   
        

 
}

export default angular.module('webdevApp.lostPage', [uiRouter, 'ngMap'])
  .config(routes)
  .component('lostPage', {
    template: require('./lostPage.html'),
    controller: LostPageComponent,
    controllerAs: 'lostPageCtrl'
  })
  .controller('ModalInstanceCtrl', ['$uibModalInstance', 'passLat', 'passLong', function ($modalInstance, passLat, passLong) {
            
            var vm = this;
            vm.lats = passLat;
            vm.longs = passLong;
            var avgLat = 0;
            var avgLong = 0;

            for(var i = 0; i<vm.lats.length; i++){
              avgLat+=vm.lats[i];
              avgLong+=vm.longs[i];
            }
            avgLat = avgLat/vm.lats.length;
            avgLong = avgLong/vm.lats.length;

            vm.source = "https://maps.googleapis.com/maps/api/staticmap?center="+avgLat+","+avgLong+"&zoom=16&size=550x300&maptype=roadmap&";
            
            for(var i = 0; i<vm.lats.length; i++){
            vm.source+="&markers=color:red%7C"+vm.lats[i]+","+vm.longs[i];
            
            }

            vm.source+="&key=AIzaSyAOhPUSyEjpkDs4SpVN5olLerP8LOP2qaw";
            
            console.log(vm.source);
            vm.close = function () {
            
              $modalInstance.close();
            };
 
        }])
  .factory('LostItem', LostItemResource)
  .name;

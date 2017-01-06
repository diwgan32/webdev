'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {
    LostItemResource
} from './lostItem.service.ts';

import routes from './lostPage.routes';
import {AnchorSmoothScroll} from '../../components/util/smoothscroll.service.ts';
export class LostPageComponent {
    /*@ngInject*/
    $scope;
    LostItem;
    getCurrentUser: Function;
    $http;
    AnchorSmoothScroll;
    constructor(NgMap, $scope, Auth, LostItem, $uibModal, $http, AnchorSmoothScroll) {
        'ngInject';
        $scope.lostItemName = "";
        $scope.lostItemDescription = "";
        $scope.numClick = 0;
        $scope.lats = [];
        $scope.longs = [];
        $scope.coordString = [];
        this.$scope = $scope;
        this.$http = $http;
        this.getCurrentUser = Auth.getCurrentUserSync;
        this.LostItem = LostItem;
        this.AnchorSmoothScroll = AnchorSmoothScroll;
        $scope.return_items = this.getLostItems();
        $scope.open = function(item, index) {

            var modalInstance = $uibModal.open({
                template: require('./myModal.html'),
                controller: 'ModalInstanceCtrl as vm',

                resolve: {
                    passLat: function() {
                        return item.lats;
                    },
                    passLong: function() {
                        return item.longs;
                    }
                }
            })
        };


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

    submitLostItems(form) {
        if(this.$scope.lats.length > 0){

            this.LostItem.save({
                    userName: this.getCurrentUser().email,
                    itemName: this.$scope.lostItemName,
                    itemDesc: this.$scope.lostItemDescription,
                    lats: this.$scope.lats,
                    longs: this.$scope.longs
                }).$promise
                .then((result) => {
                    
                    this.$scope.return_items.push(result);
                    this.$scope.lostItemName = "";
                    this.$scope.lostItemDescription = "";
                    this.$scope.lats = [];
                    this.$scope.longs = [];
                    this.$scope.coordString = [];
                    this.AnchorSmoothScroll.smoothScroll("items");
                })
        }

    }

    getLostItems() {
        var list = [];
        this.getCurrentUser().$promise.then( (user) => {
            
            this.LostItem.getUsers({userName: user.email}).$promise.then( (items) => 
            {
                for(let datum of items){
                    list.push(datum);
                }
                
            })
            .catch(err => {
                console.log(err);
            });
        });
       
        return list;
    }

    locationClick(item) {
        this.$scope.open(item);
    }

    removeLocation(item){
        this.$http.delete("/api/lostitems/"+item._id);
        var index = this.$scope.return_items.indexOf(item, 0);
        if (index > -1) {
           this.$scope.return_items.splice(index, 1);
        }
        

    }

    locationIsNotSelectedOnMap(){
        return this.$scope.lats.length == 0;
    }
}

export default angular.module('webdevApp.lostPage', [uiRouter])
    .config(routes)
    .component('lostPage', {
        template: require('./lostPage.html'),
        controller: LostPageComponent,
        controllerAs: 'lostPageCtrl'
    })
    .controller('ModalInstanceCtrl', ['$uibModalInstance', 'passLat', 'passLong', function($modalInstance, passLat, passLong) {

        var vm = this;
        vm.lats = passLat;
        vm.longs = passLong;
        var avgLat = 0;
        var avgLong = 0;

        for (var i = 0; i < vm.lats.length; i++) {
            avgLat += vm.lats[i];
            avgLong += vm.longs[i];
        }
        avgLat = avgLat / vm.lats.length;
        avgLong = avgLong / vm.lats.length;

        vm.source = "https://maps.googleapis.com/maps/api/staticmap?center=" + avgLat + "," + avgLong + "&zoom=13&size=550x300&maptype=roadmap&";

        for (var i = 0; i < vm.lats.length; i++) {
            vm.source += "&markers=color:red%7C" + vm.lats[i] + "," + vm.longs[i];
        }

        vm.source += "&key=AIzaSyAOhPUSyEjpkDs4SpVN5olLerP8LOP2qaw";
        
        vm.close = function() {
            $modalInstance.close();
        };

    }])
    .factory('LostItem', LostItemResource)
    .service('AnchorSmoothScroll', AnchorSmoothScroll)
    .name;
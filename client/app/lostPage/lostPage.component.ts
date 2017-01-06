'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {
    LostItemResource
} from '../../components/dataService/lostItem.service.ts';
import routes from './lostPage.routes';

export class LostPageComponent {
    /*@ngInject*/
    $scope;
    LostItem;
    getCurrentUser: Function;
    $http;
    constructor(NgMap, $scope, Auth, LostItem, $uibModal, $http) {
        'ngInject';
        this.$scope = $scope;
        this.$http = $http;
        this.getCurrentUser = Auth.getCurrentUserSync;
        this.LostItem = LostItem;

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

        vm.source = "https://maps.googleapis.com/maps/api/staticmap?center=" + avgLat + "," + avgLong + "&zoom=15&size=550x300&maptype=roadmap&";

        for (var i = 0; i < vm.lats.length; i++) {
            vm.source += "&markers=color:red%7C" + vm.lats[i] + "," + vm.longs[i];
        }

        vm.source += "&key=AIzaSyAOhPUSyEjpkDs4SpVN5olLerP8LOP2qaw";

        console.log(vm.source);
        
        vm.close = function() {
            $modalInstance.close();
        };

    }])
    .factory('LostItem', LostItemResource)
    .name;
'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import routes from './foundPage.routes.ts'
import {FoundItemResource} from './founditems.service.ts';
import {camera} from '../../../bower_components/ng-camera/dist/ng-camera.js'
import {AnchorSmoothScroll} from '../../components/util/smoothscroll.service.ts';

export class FoundPageComponent {
  /*@ngInject*/
  FoundItem;
  channel;
  image_data;
  AnchorSmoothScroll;
  $scope;
  getCurrentUser: Function;
  constructor(FoundItem, $scope, AnchorSmoothScroll, $window, NgMap, Auth, Upload) {
    this.FoundItem = FoundItem;
    this.$scope = $scope;
    this.$scope.foundItemName = "";
    this.$scope.foundItemDescription = "";
    this.channel = {
      videoHeight: 800,
      videoWidth: 600,      
      video: null // Will reference the video element on success
    };
    this.AnchorSmoothScroll = AnchorSmoothScroll;
    this.getCurrentUser = Auth.getCurrentUserSync;
    $scope.onFileSelect = function($files) {
  Upload.upload({
    url: '/api/fileUploads',
    file: $files,            
  }).progress(function(e) {
  }).then(function(data, status, headers, config) {
    // file is uploaded successfully
    console.log(data);
  }); 
  }
}

  createURI(){
     console.log(this.channel.video);
     this.AnchorSmoothScroll.smoothScroll("map");
  }
  onStream(stream){
    console.log(stream);
  }

  submitFoundItems(form){
    console.log("asdf");
    this.FoundItem.save({
      userName: this.getCurrentUser().email,
      itemName: this.$scope.foundItemName,
      itemDesc: this.$scope.foundItemDescription,
      fileName: "./imgs/"+this.nodeuid()+".jpg",
      lat: 0,
      long: 0

    }).$promise.then(() => {
      console.log("success");
    });
  }

  nodeuid(){
    let a = "";
    for(let i = 0; i<5; i++){
        a+="A";
    }
    return a;
  }

}

export default angular.module('webdevApp.foundPage', [uiRouter])
  .config(routes)
  .component('foundPage', {
    template: require('./foundPage.html'),
    controller: FoundPageComponent,
    controllerAs: 'foundPageCtrl'
  })
  .factory("FoundItem", FoundItemResource)
  .service("AnchorSmoothScroll", AnchorSmoothScroll)
  
  .name;

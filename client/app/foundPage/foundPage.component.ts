'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import routes from './foundPage.routes.ts'
import { FoundItemResource } from './founditems.service.ts'
import { AnchorSmoothScroll } from '../../components/util/smoothscroll.service.ts';

export class FoundPageComponent {
  /*@ngInject*/
  FoundItem;
  channel;
  image_data;
  AnchorSmoothScroll;
  $scope;
  getCurrentUser: Function;
  filename: String;
  constructor(FoundItem, $scope, AnchorSmoothScroll, $window, NgMap, Auth, Upload) {
    this.FoundItem = FoundItem;
    this.$scope = $scope;
    this.$scope.foundItemName = "";
    this.$scope.foundItemDescription = "";
    this.filename = "";
    this.channel = {
      videoHeight: 800,
      videoWidth: 600,
      video: null // Will reference the video element on success
    };
    this.AnchorSmoothScroll = AnchorSmoothScroll;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.$scope.Upload = Upload;
    
    this.$scope.onFileSelect = function($files) {
      this.Upload.upload({
        url: '/api/fileUploads',
        file: $files,
      }).progress(function(e) {
      }).then(function(data, status, headers, config) {
        $scope.filename = "./images/"+data.data+".jpg";
      });
    }
  }

  fileSelectWrapper($files){
    this.$scope.onFileSelect($files);
    this.AnchorSmoothScroll.smoothScroll("describe");
  }

  submitFoundItems(form) {
    console.log("asdf");
    this.FoundItem.save({
      userName: this.getCurrentUser().email,
      itemName: this.$scope.foundItemName,
      itemDesc: this.$scope.foundItemDescription,
      fileName: this.$scope.filename,
      lat: 0,
      long: 0

    }).$promise.then(() => {
      this.$scope.foundItemName = "";
      this.$scope.foundItemDescription = "";
      this.$scope.filename = "";
      this.AnchorSmoothScroll.smoothScroll("picture");
      this.$scope.$apply();
    });
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

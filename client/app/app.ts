'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');

// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import lostPage from './lostPage/lostPage.component'


import './app.scss';

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['lafApp'], {
      strictDi: true
    });
  });


const uiMap = require('uiGmapgoogle-maps');
angular.module('lafApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  uiRouter,
  uiBootstrap,

  _Auth,
  account,
  admin,  navbar,
  footer,
  main, lostPage,
  constants, uiMap,

  util, 
])
.config(routeConfig)
.config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBYhSeMP_1hP9gm4MpWOezqUaoJOYPrzNw',
    v: '2.3.2', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})
.controller('mapCtrl', function($scope, uiGmapGoogleMapApi) {
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    });
})
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
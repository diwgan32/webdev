'use strict';

const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const ngAnimate = require('angular-animate');

//const ngMessages = require('angular-messages');
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
import foundPage from './foundPage/foundPage.component'
import lostPageMap from './lostPageMap/lostPageMap.component'
import lostPageDescription from './lostPageDescription/lostPageDescription.component'
import {LostItemData} from '../components/dataService/lostitemdata.service.ts'
import './app.scss';

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['lafApp'], {
      strictDi: true
    });
  });


const uiMap = require('ngMap');
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
  main,
  constants, uiMap, lostPageMap, ngAnimate, lostPageDescription, lostPage,

  util, 
])
.config(routeConfig)
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
  })
  .factory('LostItemData', LostItemData);



'use strict';

/**
 * @ngdoc overview
 * @name somersbyFriendsieApp
 * @description
 * # somersbyFriendsieApp
 *
 * Main module of the application.
 */
angular
  .module('somersbyFriendsieApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'somersbyFriendsieApp.page',
    'somersbyFriendsieApp.background'
  ])
  .config(function ($routeProvider, FacebookProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    FacebookProvider.init('1482326585362031');
  });

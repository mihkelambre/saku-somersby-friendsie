'use strict';

angular
  .module('somersbyFriendsieApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'facebook',
    'somersbyFriendsieApp.directives.moveable',
    'somersbyFriendsieApp.directives.freetrans',
    'somersbyFriendsieApp.directives.fblike',
    'somersbyFriendsieApp.pages.intro',
    'somersbyFriendsieApp.pages.create',
    'somersbyFriendsieApp.pages.gallery',
    'somersbyFriendsieApp.pages.friendsie'
  ])
  .config(function ($routeProvider, FacebookProvider) {

    FacebookProvider.init('1469057436688946');

  });

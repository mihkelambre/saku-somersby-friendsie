'use strict';

/**
 * @ngdoc function
 * @name somersbyFriendsieApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the somersbyFriendsieApp
 */
angular.module('somersbyFriendsieApp')
  .controller('MainCtrl', function ($scope, Facebook) {
    
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
        Facebook.login(function(response) {
          if(response.status === 'connected') {
            $scope.loggedIn = true;
          }
        }, {scope : "user_friends"});
      }
      console.log($scope.loggedIn);
    });

    $scope.$watch(function() {
      return Facebook.isReady();
    }, function(newVal) {
      $scope.facebookReady = true;
      console.log('$scope.facebookReady', newVal);
    });

    $scope.$watch('loggedIn', function(isLoggedIn) {
      console.log('logged in', isLoggedIn);
      if(isLoggedIn) {
        loadMe();
      }
    });

    var loadMe = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
        console.log($scope.user);
      });

      Facebook.api('/me/friends', function(response) {
        $scope.friends = response;
        console.log($scope.friends);
      });

      Facebook.api('/me/permissions', function(response) {
        console.log(response);
      });
    }
  });

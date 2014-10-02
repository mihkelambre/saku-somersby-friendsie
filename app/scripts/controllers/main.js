'use strict';

angular.module('somersbyFriendsieApp')
  .controller('MainController', function ($scope, $rootScope, $window, $http, $location) {

    $rootScope.$on('gotoPage', function(event, pageName) {
      $scope.currentPage = pageName;
    });

    //$window.tabData = '9c113dc4c8c51ba5fca29e4ffe2e49d1';
    if($window.tabData) {
      $http.get('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/gallery.php?hash=' + $window.tabData + '&' + Math.random()).
      success(function(data, status, headers, config) {
        if(data.friendsies.length > 0) {
          $rootScope.friendsie = data.friendsies[0];
          $rootScope.$broadcast('gotoPage', 'friendsie');
        } else {
          $rootScope.$broadcast('gotoPage', 'intro');
        }
      }).
      error(function(data, status, headers, config) {
      });
    } else {
      $rootScope.$broadcast('gotoPage', 'intro');
    }

    $scope.showRules = false;
    $rootScope.showPrizes = false;

    $scope.getClass = function() {
      var clazz = $scope.currentPage;
      //if($scope.showRules) clazz += ' rules';
      return clazz;
    }

    $scope.goto = function(link, isExternal, args) {
      if(isExternal) { 
        $window.open(link);
        return false;
      } else {
        $rootScope.$broadcast('gotoPage', link);
      }
    }

    $scope.loadFriendsie = function(friendsie) {
      $rootScope.friendsie = friendsie;
    }

  });
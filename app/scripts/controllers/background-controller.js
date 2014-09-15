'use strict';

angular.module('somersbyFriendsieApp.background', [])
  .controller('BackgroundController', function ($scope, $rootScope) {

    $scope.currentPage = 'intro';

    $rootScope.$on('gotoPage', function(event, pageName) {
      $scope.currentPage = pageName;
    });

    $scope.getClass = function() {
      console.log('get class', $scope.currentPage);
      return $scope.currentPage;
    }

  });
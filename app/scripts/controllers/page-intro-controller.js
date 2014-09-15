'use strict';

angular.module('somersbyFriendsieApp.page', [])
  .controller('PageIntroController', function ($scope, $rootScope) {

    $scope.kala = 'maja';

    $scope.gotoUpload = function() {
      console.log('UPLAOD');
      $rootScope.$broadcast('gotoPage', 'upload');
    }
  });
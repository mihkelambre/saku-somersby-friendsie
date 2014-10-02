'use strict';

angular.module('somersbyFriendsieApp.pages.intro', [])
  .controller('PageIntroController', function ($scope, $rootScope, Facebook) {

    $scope.animationPhase = 'animate-in';

    $scope.ageChecked = false;

    $rootScope.$on('gotoPage', function(event, pageName) {
      if (pageName === 'intro') {
        $scope.animationPhase = 'animate-in';
      } else {
        $scope.animationPhase = 'animate-out';
      }
    });

    $scope.getAnimationClass = function() {
      return $scope.animationPhase;
    }

    $scope.checkAgeCheck = function() {
      if($scope.ageChecked) {
        $scope.goto('create');
      }
    }
  });
'use strict';

angular.module('somersbyFriendsieApp.pages.gallery', ['ui.slimscroll'])
  .controller('PageGalleryController', function ($scope, $rootScope, $http, Facebook, $element) {

    $scope.animationPhase = 'animate-in';

    $scope.filter = 'all';

    $scope.$watch('filter', function(newVal, oldVal) {
      $scope.items = [];
      $scope.loading = true;
      if(newVal == 'all') {
        $http.get('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/gallery.php?' + Math.random()).
          success(function(data, status, headers, config) {
            $scope.items = [];
              $scope.winners = [];
            data.friendsies.forEach(function(friendsie) {
              $scope.items.push(
                {
                  "photo": friendsie.photo,
                  "url": friendsie.url,
                  "name": friendsie.name,
                  "likes": 1221
                }
              );
            });
            $scope.loading = false;
            $scope.$broadcast('rebuild:me');
          }).
          error(function(data, status, headers, config) {
            $scope.loading = false;
            $scope.$broadcast('rebuild:me');
          });
      }
      else if(newVal == 'friends') {
        Facebook.api('/me/friends', function(response) {
          var ids = _.pluck(response.data, 'id').join();
          $http.get('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/gallery.php?friends=' + ids).
            success(function(data, status, headers, config) {
              $scope.items = [];
              $scope.winners = [];
              data.friendsies.forEach(function(friendsie) {
                $scope.items.push(
                  {
                    "photo": friendsie.photo,
                    "url": friendsie.url,
                    "name": friendsie.name,
                    "likes": 1221
                  }
                );
              });
              $scope.loading = false;
              $scope.$broadcast('rebuild:me');
            }).
            error(function(data, status, headers, config) {
              $scope.loading = false;
              $scope.$broadcast('rebuild:me');
            });
        });
      }
      else if(newVal == 'winners') {
        $http.get('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/winners.php?' + Math.random()).
          success(function(data, status, headers, config) {
            $scope.items = [];
            $scope.winners = data.periods;
            $scope.loading = false;
            $scope.$broadcast('rebuild:me');
          }).
          error(function(data, status, headers, config) {
            $scope.loading = false;
            $scope.$broadcast('rebuild:me');
          });
        $scope.loading = false;
      }
    });

    $rootScope.$on('gotoPage', function(event, pageName) {
      if (pageName === 'gallery') {
        //$scope.filter = 'all';
      }
    });

    //$scope.items = [];

    $rootScope.$on('gotoPage', function(event, pageName) {
      if (pageName === 'gallery') {
        $scope.animationPhase = 'animate-in';
      } else {
        $scope.animationPhase = 'animate-out';
      }
    });

    $scope.getAnimationClass = function() {
      return $scope.animationPhase;
    }
  });
'use strict';

angular.module('somersbyFriendsieApp.pages.friendsie', [])
  .controller('PageFriendsieController', function ($scope, $rootScope) {

    $rootScope.$on('gotoPage', function(event, pageName) {
      if (pageName === 'friendsie') {
        $scope.friendsie = $rootScope.friendsie;

        // btn-like
        console.log(angular.element.find('.btn-like'));


        angular.element.find('.btn-like')[0].innerHTML = '<div class="fb-like" data-href="' + $rootScope.friendsie.url + '" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>';
        FB.XFBML.parse(angular.element.find('.btn-like')[0]);
      }
    });

  });
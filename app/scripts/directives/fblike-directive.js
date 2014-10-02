'use strict';

angular.module('somersbyFriendsieApp.directives.fblike', []).

  directive('fbLike', function($timeout, Facebook) {
    return {
      restrict: 'A',
      scope: {
        url: '@url'
      },
      template: '<div class="fb-like" data-href="{{ url }}" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>',
      link: function($scope, $element, $attrs) {
        //console.log('hmmm', $scope.url);
        $timeout(function() {
          return Facebook.parseXFBML($element[0])
        }, 50, false);
      }
    };
  });
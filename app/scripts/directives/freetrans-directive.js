'use strict';

angular.module('somersbyFriendsieApp.directives.freetrans', []).
  directive('freetrans', function ($timeout) {
      return {
          restrict: 'A',
          link: function postLink(scope, elem, attrs) {
            
            $timeout(function () {elem.freetrans({
              x: 100,
              y: 150,
              angle: 45
            })})
           }
      };
  });
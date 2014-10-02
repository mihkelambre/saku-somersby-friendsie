'use strict';

angular.module('somersbyFriendsieApp.directives.moveable', []).
  directive('moveable', ['$document' , function($document) {
    return {
      restrict: 'A',
      scope: {
        imageObject: '='
      },
      link: function(scope, elm, attrs) {
        var startX, startY, initialMouseX, initialMouseY;
        elm.css({position: 'absolute'});

        elm.css('left', scope.imageObject.left + 'px');
        elm.css('top', scope.imageObject.top + 'px');
        elm.css('width', scope.imageObject.width + 'px');

        elm.find('img').bind('load', function () {
            updateScope();
        });

        scope.$watch('imageObject.width', function() {
          elm.css('width', scope.imageObject.width + 'px');
          updateScope();
        });
        scope.$watch('imageObject.rotation', function() {
          console.log('imageObject.rotation', scope.imageObject.rotation);
          elm.css('transform', 'rotate(' + scope.imageObject.rotation + 'deg)');
          updateScope();
        });
 
        elm.bind('mousedown', function($event) {
          startX = elm.prop('offsetLeft');
          startY = elm.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });
 
        function mousemove($event) {
          var dx = $event.clientX - initialMouseX;
          var dy = $event.clientY - initialMouseY;
          elm.css({
            top:  startY + dy + 'px',
            left: startX + dx + 'px'
          });
          return false;
        }
 
        function mouseup() {
          updateScope();

          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }

        function updateScope() {
          var offsetTop = 218 + 17 - $(window).scrollTop();
          var offsetLeft = 30;
          var borderWidth = parseInt(elm.find('img').css('border-width').replace('px', ''));
          var bbox = elm[0].getBoundingClientRect();

          scope.imageObject.left = elm.prop('offsetLeft') + 28 + borderWidth;
          scope.imageObject.top = elm.prop('offsetTop') + 17 + borderWidth;
          scope.imageObject.width = elm.find('img').prop('offsetWidth') - 2 * borderWidth;
          scope.imageObject.height = elm.find('img').prop('offsetHeight') - 2 * borderWidth;
          scope.imageObject.bbox = {};
          scope.imageObject.bbox.width = Math.round(bbox.width + 2 * borderWidth);
          scope.imageObject.bbox.height = Math.round(bbox.height + 2 * borderWidth);
          scope.imageObject.bbox.top = Math.round(bbox.top - offsetTop);
          scope.imageObject.bbox.left = Math.round(bbox.left - offsetLeft);

          //console.log(scope.imageObject.bbox.top, bbox.top, bbox.width + ' x ' + bbox.height, bbox);//, elm.prop('offsetTop'), elm.prop('offsetLeft'), bbox);
        }
      }
    };
  }]);
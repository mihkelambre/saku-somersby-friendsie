'use strict';

angular.module('somersbyFriendsieApp.pages.create', ['ngDropzone', 'ngDraggable'])
  .controller('PageCreateController', function ($scope, $rootScope, $http, Facebook, $window) {

    $scope.animationPhase = 'animate-in';

    $rootScope.$on('gotoPage', function(event, pageName) {
      if (pageName === 'create') {
        $scope.userPhoto = null;
        $scope.loadingUserPhoto = false;
        $scope.friendsifyingUserPhoto = false;
        $scope.friendsifiedPhoto = null;
        $scope.askToLike = false;
      }
    });

    $scope.userPhoto = null;
    $scope.loadingUserPhoto = false;
    $scope.friendsifyingUserPhoto = false;
    $scope.friendsifiedPhoto = null;
    $scope.uploadUrl = "https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/upload.php?fbid=";
    $scope.dz;
    $scope.dz2;
    $scope.dzConfig = {
      url: "https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/upload.php?fbid="
    };
    $scope.dzEventHandlers = {
      success: function(file, response, xhr) {
        $scope.$apply(function () {
            $scope.userPhoto = response.url + '?' + Math.random();
            $scope.loadingUserPhoto = false;
        });
      },
      sending: function() {
        $scope.$apply(function () {
            $scope.loadingUserPhoto = true;
        });
      }
    };

    $scope.friendsify = function() {
      $scope.friendsifyingUserPhoto = true;
      $scope.askToLike = true;

      // Send data
      $http.post('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/friendsify.php?fbid=' + $scope.userRegister.fb_id, {'layers': $scope.layers}).
        success(function(data, status, headers, config) {
          Facebook.ui({
            method: 'share',
            href: data.url,
          }, function(response){
            $scope.checkFacebookStatus();
          });
        }).
        error(function(data, status, headers, config) {
          //console.log('e', data);
        });
    }

    $scope.checkFacebookStatus = function() {
      Facebook.getLoginStatus(function(response) {
        FB.Canvas.setAutoGrow(7);
        if(response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
          Facebook.login(function(response) {
            if(response.status === 'connected') {
              $scope.loggedIn = true;
            }
          }, {scope : "public_profile, user_friends, email"});
        }
      });
    }
    //$scope.checkFacebookStatus();

    var initForm = function() {
      $scope.checkFacebookStatus();

      $scope.userRegister = {
        name: '',
        email: '',
        phone: '',
        fb_id: ''
      }
    }

    var initAskToLike = function() {
      Facebook.api('/me/likes/199682323392012', function(response) {
        $scope.askToLike = response.data.length == 0;
        $scope.askToLike = true;
      });
    }

    initForm();

    $scope.$watch('loggedIn', function(isLoggedIn) {
      if(isLoggedIn) {
        console.log('Logged in to Facebook');
        Facebook.api('/me', function(response) {
          $scope.me = response;
          $scope.userRegister.name = $scope.me.name;
          $scope.userRegister.fb_id = $scope.me.id;
          $scope.dz.options.url = "https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/upload.php?fbid=" + $scope.me.id;
          $scope.dz2.options.url = "https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/upload.php?fbid=" + $scope.me.id;
        });
      } else {
        console.log('Not logged in to Facebook');
      }
    });

    $scope.skipLike = function() {
      $scope.form = true;
    }

    $scope.register = function() {

      $scope.registerErrors = {

      }

      $http.post('https://www.interactive.ee/demo/dia/saku/somersby-selfie/api/register.php', $scope.userRegister).
        success(function(data, status, headers, config) {
          $scope.registered = true;
        }).
        error(function(data, status, headers, config) {
          console.log('EROR', data);
          $scope.registerErrors = data.errors;
        });
    }

    $scope.getStep = function() {
      var step = '';
      if(!$scope.userPhoto) {
        step = 'upload';
      }
      if($scope.loadingUserPhoto) {
        step = 'loading';
      }
      if($scope.userPhoto) {
        step = 'loaded';
      }
      if($scope.friendsifyingUserPhoto ) {
        step = 'loading';
      }
      if($scope.askToLike) {
        step = 'askToLike';
      }
      if($scope.form) {
        step = 'form';
      }
      if($scope.registered) {
        step = 'registered';
      }
      step = 'loaded';
      return step;
    }

    $scope.getStepClass = function() {
      var currentStep = $scope.getStep();
      if(currentStep == 'upload' || currentStep == 'loading') {
        return 'step-upload';
      }
      if(currentStep == 'loaded' || currentStep == 'loading') {
        return 'step-friendsify';
      }
      if(currentStep == 'askToLike' || currentStep == 'form' || currentStep == 'registered') {
        return 'step-done';
      }
    }

    // Dragging

    $scope.selectedLayer;
    $scope.draggables = [
      {
        'class': 'thief',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'girl',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'lord',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'gentleman',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'queen',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'einstein',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'astronaut',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'pin-up',
        'left': 0,
        'top': 0,
        'width': 300,
        'height': 300,
        'rotation': 0
      },
      {
        'class': 'balloon',
        'left': 150,
        'top': 0,
        'width': 150,
        'height': 300,
        'rotation': 0
      }
    ];
    $scope.layers = [];
    /*for (var i = 0; i < 5; i++) {
      $scope.layers.push(
        {
          "class": $scope.draggables[i]
        }
      );
    }*/

    $scope.toolZoomIn = function() {
      $scope.selectedLayer.width = $scope.selectedLayer.width + 10;
    }
    $scope.toolZoomOut = function() {
      $scope.selectedLayer.width = $scope.selectedLayer.width - 10;
    }
    $scope.toolRotateLeft = function() {
      $scope.selectedLayer.rotation = $scope.selectedLayer.rotation + 10;
    }
    $scope.toolRotateRight = function() {
      $scope.selectedLayer.rotation = $scope.selectedLayer.rotation - 10;
    }
    $scope.toolDone = function() {
      $scope.selectedLayer = null;
    }
    $scope.toolCancel = function() {
      $scope.removeLayer($scope.selectedLayer);
    }

    $scope.removeLayer = function(data) {
      if($scope.selectedLayer && data.class == $scope.selectedLayer.class) $scope.selectedLayer = null;
      _.remove($scope.layers, function(layer) { 
        return layer.class == data.class;
      });
    }

    $scope.isLayerAdded = function(data) {
      return _.find($scope.layers, function(layer) {
        return layer.class == data.class;
      });
    }

    
    $scope.onDragComplete = function(data,evt){
      console.log("drag success, data:", data, $scope.layers);
      $scope.selectedLayer = data;
      $scope.layers.push(data);
    }
  });
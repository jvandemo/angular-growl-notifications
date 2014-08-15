angular.module('growlNotifications.directives')
  .directive('growlNotification', ['growlNotifications', '$animate', '$timeout', function (growlNotifications, $animate, $timeout) {

    var defaults = {
      ttl: 5000
    };

    return {
      restrict: 'AE',
      controller: function($scope, $element, $attrs){

        // Placeholder for timer promise
        this.timer = null;

        // Close method to close growl notification manually
        this.close = function(){

          // Remove the element
          $animate.leave($element);

          // Cancel scheduled automatic removal if there is one
          if (this.timer && this.timer.cancel) {
            this.timer.cancel();
          }
        };

      },
      controllerAs: '$growlNotification',
      link: function (scope, iElem, iAttrs, ctrl) {

        // Assemble options
        var options = angular.extend({}, defaults, scope.$eval(iAttrs.growlNotificationOptions));

        if(iAttrs.ttl){
          options.ttl = scope.$eval(iAttrs.ttl);
        }

        // Move the element to the right location in the DOM
        $animate.move(iElem, growlNotifications.element);

        // Schedule automatic removal
        ctrl.timer = $timeout(function () {
          $animate.leave(iElem);
        }, options.ttl);

      }
    };

  }]);
angular.module('growlNotifications.directives')
  .directive('growlNotification', ['growlNotifications', '$animate', '$timeout', function (growlNotifications, $animate, $timeout) {

    var defaults = {
      ttl: 5000
    };

    return {
      restrict: 'AE',
      scope: true,
      compile: function (tElem, tAttrs) {

        if (!growlNotifications.element) {
          throw new Error('Skipping growlNotification directive because no growlNotifications directive has been defined');
        }

        return {

          // Wait for post link function so all child elements have been compiled
          // and linked to their correct scope
          post: function (scope, iElem, iAttrs) {

            // Assemble options
            var options = angular.extend({}, defaults, scope.$eval(iAttrs.growlNotification)),
                timer;

            // Move the element to the right location in the DOM
            $animate.move(iElem, growlNotifications.element);

            // Provide a remove function to remove the growl instance
            scope.remove = function () {

              // Remove the element
              $animate.leave(iElem);

              // Cancel scheduled automatic removal if there is one
              if (timer) {
                timer.cancel();
              }
            };

            // Schedule automatic removal
            timer = $timeout(function () {
              $animate.leave(iElem);
            }, options.ttl);

          }
        };

      }
    };


  }]);
(function () {

  function growlNotificationDirective(growlNotifications, $animate, $timeout) {

    var defaults = {
      ttl: growlNotifications.options.ttl || 5000
    };

    return {

      /**
       * Allow compilation via attributes as well so custom
       * markup can be used
       */
      restrict: 'AE',

      /**
       * Create new child scope
       */
      scope: true,

      /**
       * Controller
       */
      controller: growlNotificationController,

      /**
       * Make the controller available in the directive scope
       */
      controllerAs: '$growlNotification',

      /**
       * Post link function
       *
       * @param scope
       * @param iElem
       * @param iAttrs
       * @param ctrl
       */
      link: function (scope, iElem, iAttrs, ctrl) {

        // Assemble options
        var options = angular.extend({}, defaults, scope.$eval(iAttrs.growlNotificationOptions));

        if (iAttrs.ttl) {
          options.ttl = scope.$eval(iAttrs.ttl);
        }

        // Move the element to the right location in the DOM
        $animate.move(iElem, growlNotifications.element);

        // Run onOpen handler if there is one
        if (iAttrs.onOpen) {
          scope.$eval(iAttrs.onOpen);
        }

        // Schedule automatic removal
        ctrl.timer = $timeout(function () {
          $animate.leave(iElem);

          // Run onClose handler if there is one
          if(iAttrs.onClose){
            scope.$eval(iAttrs.onClose);
          }
        }, options.ttl);

      }
    };

  }

  // Inject dependencies
  growlNotificationDirective.$inject = ['growlNotifications', '$animate', '$timeout'];

  /**
   * Directive controller
   *
   * @param $element
   * @param $animate
   * @param $attrs
   * @param $scope
   */
  function growlNotificationController($element, $animate, $attrs, $scope, $timeout) {

    /**
     * Placeholder for timer promise
     */
    this.timer = null;

    /**
     * Helper method to close notification manually
     */
    this.remove = function () {

      // Remove the element
      $animate.leave($element);

      // Cancel scheduled automatic removal if there is one
      if (this.timer) {
        $timeout.cancel(this.timer);

        // Run onClose handler if there is one
        if($attrs.onClose){
          $scope.$eval($attrs.onClose);
        }
      }
    };

  }

  // Inject dependencies
  growlNotificationController.$inject = ['$element', '$animate', '$attrs', '$scope', '$timeout'];

  // Export
  angular
    .module('growlNotifications.directives')
    .directive('growlNotification', growlNotificationDirective);

})();

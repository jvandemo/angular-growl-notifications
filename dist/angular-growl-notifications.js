(function(window, document) {
// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('growlNotifications.config', [])
    .value('growlNotifications.config', {
        debug: true
    });

// Modules
angular.module('growlNotifications.directives', []);
angular.module('growlNotifications.filters', []);
angular.module('growlNotifications.services', []);
angular.module('growlNotifications',
    [
        'growlNotifications.config',
        'growlNotifications.directives',
        'growlNotifications.filters',
        'growlNotifications.services'
    ]);
angular.module('growlNotifications.directives')
  .directive('growlNotification', ['growlNotifications', '$animate', '$timeout', function (growlNotifications, $animate, $timeout) {

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
       *
       * @param $scope
       * @param $element
       * @param $attrs
       */
      controller: ['$scope', '$element', function($scope, $element){

        /**
         * Placeholder for timer promise
         */
        this.timer = null;

        /**
         * Helper method to close notification manually
         */
        this.remove = function(){

          // Remove the element
          $animate.leave($element);

          // Cancel scheduled automatic removal if there is one
          if (this.timer && this.timer.cancel) {
            this.timer.cancel();
          }
        };

      }],

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

  }]);angular.module('growlNotifications.directives')
  .directive('growlNotifications', ['growlNotifications', function (growlNotifications) {

    return {

      /**
       * Allow compilation via attributes as well so custom
       * markup can be used
       */
      restrict: 'AE',

      /**
       * Post link function
       *
       * @param scope
       * @param iElem
       * @param iAttrs
       */
      link: function (scope, iElem, iAttrs) {
        growlNotifications.element = iElem;
      }
    };

  }]);angular.module('growlNotifications.services')
    .provider('growlNotifications', [function () {

        // Default options
        var options = {
            ttl: 5000
        };

        /**
         * Provider method to change default options
         *
         * @param newOptions
         */
        this.setOptions = function (newOptions) {
            angular.extend(options, newOptions);
            return this;
        };

        /**
         * Provider convenience method to get or set default ttl
         *
         * @param ttl
         * @returns {*}
         */
        this.ttl = function(ttl){
            if(angular.isDefined(ttl)){
                options.ttl = ttl;
                return this;
            }
            return options.ttl;
        };

        /**
         * Factory method
         *
         * @param $timeout
         * @param $rootScope
         * @returns {GrowlNotifications}
         */
        this.$get = function () {

            function GrowlNotifications() {

                this.options = options;
                this.element = null;

            }

            return new GrowlNotifications();

        };

    }]);
})(window, document);
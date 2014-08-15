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

  }]);angular.module('growlNotifications.directives')
  .directive('growlNotifications', ['growlNotifications', function (growlNotifications) {

    return {
      restrict: 'AE',
      link: function (scope, iElem) {
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
        this.$get = function ($timeout, $rootScope) {

            function GrowlNotifications() {

                this.options = options;
                this.element = null;

            }

            return new GrowlNotifications();

        };

        this.$get.$inject = ['$timeout', '$rootScope'];


    }]);
})(window, document);
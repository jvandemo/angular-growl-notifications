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
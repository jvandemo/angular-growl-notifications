(function () {

  /**
   * Growl notifications provider
   */
  function growlNotificationsProvider() {

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
    this.ttl = function (ttl) {
      if (angular.isDefined(ttl)) {
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

  }

  // Export
  angular
    .module('growlNotifications.services')
    .provider('growlNotifications', growlNotificationsProvider);

})();

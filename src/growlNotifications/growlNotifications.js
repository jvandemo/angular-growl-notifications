(function () {

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

})();

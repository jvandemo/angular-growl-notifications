angular.module('growlNotifications.directives')
  .directive('growlNotifications', ['growlNotifications', function (growlNotifications) {

    return {
      restrict: 'AE',
      link: function (scope, iElem) {
        growlNotifications.element = iElem;
      }
    };

  }]);
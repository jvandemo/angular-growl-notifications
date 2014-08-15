angular.module('growlNotifications.directives')
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

  }]);
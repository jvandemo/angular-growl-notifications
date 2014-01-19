angular.module('growlNotifications.directives')
    .directive('growlNotifications', ['growlNotifications', '$sce', '$rootScope', '$injector', function(growlNotifications, $sce, $rootScope, $injector){

        return {
            restrict: 'AE',
            replace: true,
            template: '<ul class="list-unstyled"><li ng-repeat="(id, notification) in growlNotifications.notifications"><div class="alert alert-{{notification.type}}"><div ng-bind-html="notification.message"></div></div></li></ul>'
        };

    }]);
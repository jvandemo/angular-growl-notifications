angular.module('growlNotifications.directives')
    .directive('growlNotifications', ['growlNotifications', function(growlNotifications){

        return {
            restrict: 'AE',
            replace: true,
            scope: {},
            template: '<ul class="list-unstyled"><li ng-repeat="(id, notification) in notifications"><div class="alert alert-{{notification.type}}"><div ng-bind-html="notification.message"></div></div></li></ul>',
            link: function(scope){
                scope.notifications = growlNotifications.notifications;
            }
        };

    }]);
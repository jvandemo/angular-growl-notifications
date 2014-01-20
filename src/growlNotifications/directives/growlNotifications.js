angular.module('growlNotifications.directives')
    .directive('growlNotifications', ['growlNotifications', function(growlNotifications){

        return {
            restrict: 'AE',
            replace: false,
            scope: {},
            template: [
                '<ul class="list-unstyled">',
                '   <li ng-repeat="(id, notification) in notifications">',
                '       <div class="{{cssPrefix}} {{cssPrefix}}-{{notification.type}}">',
                '           <div ng-bind-html="notification.message">',
                '           </div>',
                '       </div>',
                '   </li>',
                '</ul>'
            ].join('\n'),
            link: function(scope){
                scope.cssPrefix = growlNotifications.options.cssPrefix;
                scope.notifications = growlNotifications.notifications;
            }
        };

    }]);
angular.module('growlNotifications.directives')
    .directive('growlNotifications', ['growlNotifications', '$sce', '$rootScope', function(growlNotifications, $sce, $rootScope){

        return {
            restrict: 'AE',
            replace: true,
            template: '<ul class="list-unstyled"></ul>',
            link: function(scope, iElem, iAttrs, ctrls, transcludeFn){

                console.log('linked');

                var updateList = function(event, notifications){

                    console.log('HEARD EVENT!');
                    var items = [];

                    angular.forEach(notifications, function(notification){
                        var markup = [];
                        markup.push('<li class="alert alert-' + notification.type + '">');
                        markup.push($sce.getTrustedHtml(notification.message));
                        markup.push('</li>');
                        items.push(markup.join(''));
                    });

                    iElem.html(items.join(''));
                };

                scope.$on('growlNotifications::update', updateList);

                updateList(null, growlNotifications.notifications);

            }

        };

    }]);
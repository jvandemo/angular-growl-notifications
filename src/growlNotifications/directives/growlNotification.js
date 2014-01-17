angular.module('growlNotifications.directives')
    .directive('growlNotification', ['growlNotifications', '$sce', '$interpolate', function(growlNotifications, $sce, $interpolate){

        return {
            restrict: 'AE',
            replace: true,
            template: '',
            transclude: true,
            link: function(scope, iElem, iAttrs, ctrls, transcludeFn){

                transcludeFn(function(elem, scope){

                    var e,
                        html,
                        interpolateFn,
                        safeHtml;

                    // Create temporary wrapper element so we can grab the inner html
                    e = angular.element(document.createElement('div'));
                    e.append(elem);
                    html = e.html();

                    // Interpolate expressions in current scope
                    interpolateFn = $interpolate(html);
                    html = interpolateFn(scope);

                    // Tell Angular the HTML can be trusted so it can be used in ng-bind-html
                    safeHtml = $sce.trustAsHtml(html);

                    // Add notification
                    growlNotifications.add(safeHtml);
                });
            }

        };

    }]);
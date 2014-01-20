angular.module('app', ['growlNotifications', 'ngSanitize', 'ngAnimate']);

angular.module('app')
    .run(['$animate', function($animate){
        $animate.enabled(true);
        console.log('Animation enabled: ' + $animate.enabled());
    }]);

angular.module('app')
    .config(['growlNotificationsProvider', function(growlNotificationsProvider){

        // Any config work you want here...
        // growlNotificationsProvider.cssPrefix('growwwwwl');

    }]);

angular.module('app')
    .controller('MainCtrl', ['$scope', 'growlNotifications', function($scope, growlNotifications){

        $scope.me = "Jurgen";

        $scope.notification = {
            message: '<strong>Awesome</strong>\nGrowl notifications rock!',
            type: 'info',
            ttl: 5000
        };

        $scope.addNotification = function(){
            growlNotifications.add(
                $scope.notification.message,
                $scope.notification.type,
                $scope.notification.ttl
            );
        };

        $scope.growlNotifications = growlNotifications;

    }]);


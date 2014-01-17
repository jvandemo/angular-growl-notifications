angular.module('app', ['growlNotifications', 'ngSanitize']);

angular.module('app')
    .controller('MainCtrl', ['$scope', 'growlNotifications', function($scope, growlNotifications){

        $scope.me = "Jurgen";

        $scope.notification = {
            message: 'Hello world',
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


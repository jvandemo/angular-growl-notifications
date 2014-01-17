(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

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

    }]);angular.module('growlNotifications.directives')
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

    }]);angular.module('growlNotifications.services')
    .provider('growlNotifications', [function () {

        // Default options
        var options = {
            ttl: 5000,
            type: 'info'
        };

        /**
         * Provider method to change default options
         *
         * @param newOptions
         */
        this.setOptions = function (newOptions) {
            angular.extend(options, newOptions);
            return this;
        };

        /**
         * Provider convenience method to get or set default ttl
         *
         * @param ttl
         * @returns {*}
         */
        this.ttl = function(ttl){
            if(angular.isDefined(ttl)){
                this.options.ttl = ttl;
                return this;
            }
            return this.options.ttl;
        };

        /**
         * Provider convenience method to get or set default type
         *
         * @param type
         * @returns {*}
         */
        this.type = function(type){
            if(angular.isDefined(type)){
                this.options.type = type;
                return this;
            }
            return this.options.type;
        };

        /**
         * Factory method
         *
         * @param $timeout
         * @param $rootScope
         * @returns {GrowlNotifications}
         */
        this.$get = function ($timeout, $rootScope) {

            function GrowlNotifications() {

                this._notifications = {};
                this._index = 0;

                Object.defineProperty(this, 'notifications', {
                    get: function(){
                        return this._notifications;
                    }
                });

            }

            GrowlNotifications.prototype._broadcastUpdate = function () {
                $rootScope.$broadcast('growlNotifications::update', this.notifications);
            };

            /**
             * Add a notification
             *
             * @param type
             * @param message
             * @param ttl
             * @returns {number} notification id that can be used to remove the notification
             */
            GrowlNotifications.prototype.add = function (message, type, ttl) {

                var notification,
                    index = this._index++,
                    self = this;

                notification = {
                    message: (message ? message.toString() : ''),
                    type   : (type ? type.toString() : options.type),
                    ttl    : (ttl ? parseInt(ttl, 10) : options.ttl)
                };

                this._notifications[index] = notification;

                $timeout(function () {
                    self.remove(index);
                }, notification.ttl);

                // Broadcast change
                this._broadcastUpdate();

                return index;

            };

            /**
             * Remove a notification by index
             * @param index
             * @returns {GrowlNotifications}
             */
            GrowlNotifications.prototype.remove = function (index) {
                if (this._notifications.hasOwnProperty(index)) {
                    delete this._notifications[index];

                    // Broadcast change
                    this._broadcastUpdate();
                }

                return this;
            };

            return new GrowlNotifications();

        };

        this.$get.$inject = ['$timeout', '$rootScope'];


    }]);})(window, document);
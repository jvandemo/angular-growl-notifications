angular.module('growlNotifications.services')
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


    }]);
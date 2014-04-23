'use strict';

describe('growlNotification directive', function() {

    var growlNotifications,
        $compile,
        $rootScope,
        markup;

    beforeEach(module('growlNotifications'));

    beforeEach(inject(function(_growlNotifications_, _$compile_, _$rootScope_){
        growlNotifications = _growlNotifications_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should add a notification to the growlNotification service', function(){
        markup = '<div growl-notification>test</div>';
        expect(growlNotifications.notifications).toEqual({});
        $compile(markup)($rootScope);
        expect(growlNotifications.notifications).toEqual({ 0 : { message : '<span class="ng-scope">test</span>', type : 'info', ttl : 5000 } });
    });

});

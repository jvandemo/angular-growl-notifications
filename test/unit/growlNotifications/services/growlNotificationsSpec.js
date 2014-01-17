'use strict';

describe('growlNotifications service', function() {

    var growlNotifications;

    beforeEach(module('growlNotifications'));

    beforeEach(inject(function(_growlNotifications_){
        growlNotifications = _growlNotifications_;
    }));

    it('should exist', function() {
        expect(growlNotifications).toBeDefined();
    });

    describe('when adding a notification', function(){

        it('should return a unique index for the notification', function(){
            var index = growlNotifications.add('some message', 'some type');
            expect(index).toBe(0);
            index = growlNotifications.add('some message', 'some type');
            expect(index).toBe(1);
        });


        it('should store the notification in the notifications object', function(){
            var index = growlNotifications.add('some message', 'some type', 5000);
            expect(growlNotifications.notifications).toEqual({
                0: {
                    message: 'some message',
                    type: 'some type',
                    ttl: 5000
                }
            });
        });



    });

});
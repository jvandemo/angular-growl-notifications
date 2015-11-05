'use strict';

describe('growlNotification directive', function () {

  var growlNotifications,
    $compile,
    $rootScope,
    markup;

  beforeEach(module('growlNotifications'));

  beforeEach(inject(function (_growlNotifications_, _$compile_, _$rootScope_) {
    growlNotifications = _growlNotifications_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

});

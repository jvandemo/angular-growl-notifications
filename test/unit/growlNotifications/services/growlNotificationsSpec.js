'use strict';

describe('growlNotifications service', function () {

  var growlNotifications;

  beforeEach(module('growlNotifications'));

  beforeEach(inject(function (_growlNotifications_) {
    growlNotifications = _growlNotifications_;
  }));

  it('should exist', function () {
    expect(growlNotifications).toBeDefined();
  });

});

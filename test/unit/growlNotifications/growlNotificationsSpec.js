'use strict';

describe('growlNotifications', function () {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function (module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function () {

    // Get module
    module = angular.module('growlNotifications');
    dependencies = module.requires;
  });

  it('should load config module', function () {
    expect(hasModule('growlNotifications.config')).toBeTruthy();
  });


  it('should load filters module', function () {
    expect(hasModule('growlNotifications.filters')).toBeTruthy();
  });


  it('should load directives module', function () {
    expect(hasModule('growlNotifications.directives')).toBeTruthy();
  });


  it('should load services module', function () {
    expect(hasModule('growlNotifications.services')).toBeTruthy();
  });


});

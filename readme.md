# Growl notifications for AngularJS

This module allows you to declaratively create growl notifications in your AngularJS application.

## Quick start

Include the module in your Angular app:

    angular.module('yourApp', ['growlNotifications']);

Specify where you want the notifications to appear in your DOM:

    <div growl-notifications></div>

Add a simple notifications using a directive that will automatically disappear after 5 seconds:

    <div growl-notification>
        Awesome, I will automatically disappear after 5 seconds.
    </div>

Conditional notifications are great when working with forms:

    <div growl-notification ng-if="formSubmitted">
        Congratulations, the form was submitted successfully!
    </div>

Expressions are supported to create customizable notifications:

    <div growl-notification>
        Hello {{name}}
    </div>

You can even use HTML markup to make your notifications look great:

    <div growl-notification>
        <b>Hello bold {{name}}</b>
    </div>

## API

### The growlNotifications service

The growlNotifications service centrally manages the notifications and can be injected anywhere in your AngularJS app.

    angular.controller('someCtrl', ['growlNotifications', function(growlNotifications){

        // Add a notification
        growlNotifications.add();

    }]);

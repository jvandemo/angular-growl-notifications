# Growl notifications for AngularJS

This module allows you to easily create growl like notifications to your AngularJS application.

## Quick start

Include the module in your Angular app:

    angular.module('yourApp', ['growlNotifications']);

Specify where you want the notifications to appear in your DOM:

    <div growl-notifications></div>

Then add notifications using a directive:

    <div growl-notification>Woohoo, it works</div>

Conditional statements are supported:

    <div growl-notification ng-if="formSubmitted">
        Congratulations, the form was submitted successfully!
    </div>

HTML and expressions are supported:

    <div growl-notification>
        Hello {{name}}
    </div>

## API

### The growlNotifications service

The growlNotifications service centrally manages the notifications and can be injected anywhere in your AngularJS app.

    angular.controller('someCtrl', ['growlNotifications', function(growlNotifications){

        // Add a notification
        growlNotifications.add();

    }]);

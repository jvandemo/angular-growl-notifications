# Growl notifications for AngularJS

This module allows you to declaratively create growl notifications that automatically disappear after a specified timeout:

- no programming required
- use directives anywhere in your code to create notifications
- each notification can be assigned an individual TTL e.g. show one notification for 10 seconds, another for 5 seconds, etc.
- supports custom notification types to allow CSS styling
- supports sanitized HTML
- supports expressions

## Quick start

### Step 1: Load the module

Include the module in your Angular app:

    angular.module('yourApp', ['growlNotifications']);

### Step 2: Specify where you want to display the notifications

Specify where you want the notifications to appear in your DOM using the `growl-notifications` directive:

    <html>
        <body>

            ...

            <!--- Put this directive anywhere in your DOM --->
            <div growl-notifications></div>

            ...

        </body>
    </html>

The `growl-notifications` directive will automatically render Bootstrap compatible markup to
display notifications using Bootstrap alert boxes.

You can also create custom markup using the API. See the API section for more details.

### Step 3

Use the `growl-notification` directive to create a notification that will automatically disappear after 5 seconds:

    <div growl-notification>
        Awesome, I will automatically disappear after 5 seconds.
    </div>

This will cause a notification to be displayed (inside the `<div growl-notifications></div>` from
the previous step) that is automatically removed after 5 seconds.

You can add conditional notifications, which are great when working with forms:

    <div growl-notification ng-if="formSubmitted">
        Congratulations, the form was submitted successfully!
        This confirmation message will be shown when $scope.formSubmitted evaluates
        to true and will disappear again after 5 seconds.
    </div>

You can use expressions to create customizable notifications:

    <div growl-notification>
        Hello {{name}}
        will display "Hello world" if $scope.name = "world"
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

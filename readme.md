# Growl notifications for AngularJS

Declaratively create notifications that automatically disappear after a specified timeout.

Think Growl, but in AngularJS. Oh, and Bootstrap compatible too.

Growl notifications for AngularJS allows you to:

- create notifications without programming
- specify a custom timeout for each notification
- use directives anywhere in your markup to create notifications
- use directives anywhere in your markup to show notifications with Bootstrap compatible markup
- use AngularJS expressions inside notifications
- display sanitized HTML inside notifications (requires ngSanitize module)
- completely customize the markup that is used to render the notifications
- customize the CSS styles used to display the notifications
- use the API to control everything programmatically if you want to

Let's look at a quick example!

## Quick start

Include the module in your Angular app:

    angular.module('yourApp', ['growlNotifications']);

Put this line anywhere in your HTML markup to specify where you want to display the notifications:

    <div growl-notifications></div>

The `growl-notifications` directive will automatically render Bootstrap compatible markup to
display notifications using Bootstrap alert boxes.

You can also create your own custom markup to display notifications any way you like.
We will get to that later.

Use the `growl-notification` directive to create a notification that will automatically disappear after 5 seconds:

    <div growl-notification>
        Awesome, I will automatically disappear after 5 seconds.
    </div>

This will cause a notification to be displayed inside the `<div growl-notifications></div>` that is automatically removed after 5 seconds.

That's it! You've got a fully working growl notification system in just 3 lines of code!

And if you are using Bootstrap, it will already look great too.

But there is more... much more... so read on...

## Creating notifications

There are 2 ways to create notifications:

- using the `growl-notification` directive in your HTML
- using the `add()` method of the `growlNotifications` service in your code

### Using the growl-notification directive

The `growl-notification` directive allows you to conveniently create notifications
from within your HTML markup:

    <div growl-notification>
        Awesome, I will automatically disappear after 5 seconds.
    </div>

You can add conditional notifications, which are great when working with forms:

    <div growl-notification ng-if="formSubmitted">
        Congratulations, the form was submitted successfully!

        This notification will be shown when $scope.formSubmitted evaluates
        as truthy and will disappear automatically after 5 seconds.
    </div>

You can use expressions to create personalized notifications:

    <div growl-notification>
        Hello {{name}}

        This will display "Hello world" if $scope.name = "world"
    </div>

You can even use HTML markup to make your notifications look great:

    <div growl-notification>
        <b>Hello bold {{name}}</b>
    </div>

### Using the growlNotifications service

The growlNotifications service centrally manages the notifications and can be injected anywhere in your AngularJS app.

To create a notification from within a controller:

    angular.controller('someCtrl', ['growlNotifications', function(growlNotifications){

        // Add a notification
        growlNotifications.add('Hello world');

    }]);

Each notification has three properties:

- `message`: the message to display inside the HTML, can contain expressions and HTML
- `type`: the notification type, can be any string and can be used to filter notifications or style them by type, defaults to 'info'
- `ttl`: the number of milliseconds to wait before the notification is removed, defaults to 5000 (5 seconds)

The `add()` method allows you to specify each property like this:

    // Add a notification with type 'info' that is removed after 5 seconds
    growlNotifications.add('Hello world');

    // Add a notification with type 'warning' that is removed after 5 seconds
    growlNotifications.add('Hello world', 'warning');

    // Add a notification with type 'warning' that is removed after 2 seconds
    growlNotifications.add('Hello world', 'warning', 2000);
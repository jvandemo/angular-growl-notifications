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

Include the `growlNotifications` and `ngSanitize` module in your Angular app:

    angular.module('yourApp', ['growlNotifications', 'ngSanitize']);

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
- using the `add()` method of the `growlNotifications` service in your JavaScript code

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

Expressions are evaluated against the scope where the `growl-notification` directive is used, not where
the `growl-notifications` is placed.

This is more intuïtive as it refers to the scope where you are using the directive.

Finally you can also use HTML markup to make your notifications look great:

    <div growl-notification>
        <b>Hello bold {{name}}</b>
    </div>

To allow HTML to be used inside the directive, the `ngSanitize` module is required, hence the need
to specify it as a dependent module in your AngularJS app.

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

The `add(message, type, ttl)` method allows you to specify each property like this:

    // Add a notification with type 'info' that is removed after 5 seconds
    growlNotifications.add('Hello world');

    // Add a notification with type 'warning' that is removed after 5 seconds
    growlNotifications.add('Hello world', 'warning');

    // Add a notification with type 'warning' that is removed after 2 seconds
    growlNotifications.add('Hello world', 'warning', 2000);

## Displaying the notifications

There are 2 ways to display notifications:

- using the `growl-notifications` directive in your HTML to create boilerplate Bootstrap compatible markup
- using the `notifications` property of the `growlNotifications` service to create your custom markup

### Using the growl-notifications directive

The `growl-notifications` directive allows you to display the notifications anywhere in your HTML:

    <div growl-notifications></div>

Under the hood, the element is transformed to:

    <ul class="list-unstyled" growl-notifications></ul>

Whenever you create a notification, a `li` item with Bootstrap compatible alert markup is created and removed when
the TTL has expired:

    <ul class="list-unstyled" growl-notifications>
        <li class="alert alert-{{type}}">
            Notification message
        </li>
    </ul>

The `li` item is assigned a CSS class `alert-{{type}}` where type is the type you specified for the notification.

This allows you to easily use Bootstrap compatible alert styles:

    // alert-info
    growlNotifications.add('Hello world', 'info');

    // alert-warning
    growlNotifications.add('Hello world', 'warning');

    // alert-danger
    growlNotifications.add('Hello world', 'danger');

    // alert-success
    growlNotifications.add('Hello world', 'success');

### Using the notifications property of the growlNotifications service

First assign the `growlNotifications` service to your `$scope`:

    angular.controller('someCtrl', ['growlNotifications', '$scope', function(growlNotifications, $scope){

        // Make sure the service can be accessed from within the view
        $scope.growlNotifications = growlNotifications;

    }]);

Then loop over the `notifications` property in your view template:

    <ul class="list-unstyled">
        <li ng-repeat="(id, notification) in growlNotifications.notifications">
            <div class="alert alert-{{notification.type}}">
                {{notification.message}}
            </div>
        </li>
    </ul>

This allows you to create virtually any markup you could possible think of.

## Change log

### v0.2.0

- Add `growl-notification` directive to conveniently add notifications from within HTML markup
- Add `growl-notifications` directive to conveniently display notifications from within HTML markup
- Add documentation

### v0.1.0

- Initial version


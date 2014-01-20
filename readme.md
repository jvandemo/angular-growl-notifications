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

Check out this [online demo](http://jvandemo.github.io/angular-growl-notifications/demo/).

Let's examine a quick example!

## Quick example

Load the required script libraries:

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="angular-sanitize.js"></script>
<script type="text/javascript" src="growl-notifications.js"></script>
```

Specify the `growlNotifications` and `ngSanitize` modules as dependencies in your Angular app:

```javascript
angular.module('yourApp', ['growlNotifications', 'ngSanitize']);
```

Put this line anywhere in your HTML markup to specify where you want to display the notifications:

```html
<div growl-notifications></div>
```

The `growl-notifications` directive will automatically render Bootstrap compatible markup to
display notifications using Bootstrap alert boxes.

You can also create your own custom markup to display notifications any way you like.
We will get to that later.

Use the `growl-notification` directive to create a notification that will automatically disappear after 5 seconds:

```html
<div growl-notification>
    Awesome, I will automatically disappear after 5 seconds.
</div>
```

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

```html
<div growl-notification>
    Awesome, I will automatically disappear after 5 seconds.
</div>
```

Pass an object if you want to individually specify the `type` and `ttl` options:

```html
<div growl-notification><strong>Welcome (TTL 5000)</strong></div>

<div growl-notification="{ttl: 6000, type: 'danger'}"><strong>Danger (TTL 6000)</strong></div>

<div growl-notification="{ttl: 8000, type: 'success'}"><strong>Success (TTL 8000)</strong></div>
```

You can add conditional notifications, which are great when working with forms:

```html
<div growl-notification ng-if="formSubmitted">
    Congratulations, the form was submitted successfully!

    This notification will be shown when $scope.formSubmitted evaluates
    as truthy and will disappear automatically after 5 seconds.
</div>
```

You can use expressions to create personalized notifications:

```html
<div growl-notification>
    Hello {{name}}

    This will display "Hello world" if $scope.name = "world"
</div>
```

Expressions are evaluated against the scope where the `growl-notification` directive is used, not where
the `growl-notifications` is placed.

This is more intuïtive as it refers to the scope where you are using the directive.

Finally you can also use HTML markup to make your notifications look great:

```html
<div growl-notification>
    <b>Hello bold {{name}}</b>
</div>
```

To allow HTML to be used inside the directive, the `ngSanitize` module is required, hence the need
to specify it as a dependent module in your AngularJS app.

### Using the growlNotifications service

The growlNotifications service centrally manages the notifications and can be injected anywhere in your AngularJS app.

To create a notification from within a controller:

```javascript
angular.controller('someCtrl', ['growlNotifications', function(growlNotifications){

    // Add a notification
    growlNotifications.add('Hello world');

}]);
```

Each notification has three properties:

- `message`: the message to display inside the HTML, can contain expressions and HTML
- `type`: the notification type, can be any string and can be used to filter notifications or style them by type, defaults to 'info'
- `ttl`: the number of milliseconds to wait before the notification is removed, defaults to 5000 (5 seconds)

The `add(message, type, ttl)` method allows you to specify each property like this:

```javascript
// Add a notification with type 'info' that is removed after 5 seconds
growlNotifications.add('Hello world');

// Add a notification with type 'warning' that is removed after 5 seconds
growlNotifications.add('Hello world', 'warning');

// Add a notification with type 'warning' that is removed after 2 seconds
growlNotifications.add('Hello world', 'warning', 2000);
```

## Displaying the notifications

There are 2 ways to display notifications:

- using the `growl-notifications` directive in your HTML to create boilerplate Bootstrap compatible markup
- using the `notifications` property of the `growlNotifications` service to create your custom markup

### Using the growl-notifications directive

The `growl-notifications` directive allows you to display the notifications anywhere in your HTML:

```html
<div growl-notifications></div>
```

Under the hood, the element is transformed to:

```html
<div growl-notifications>
    <ul class="list-unstyled"></ul>
</div>
```

Whenever you create a notification, a `li` item with Bootstrap compatible alert markup is created and removed when
the TTL has expired:

```html
<div growl-notifications>
    <ul class="list-unstyled">
        <li class="alert alert-{{type}}">
            Notification message
        </li>
    </ul>
</div>
```

The `li` item is assigned a CSS class `alert-{{type}}` where type is the type you specified for the notification.

This allows you to easily use Bootstrap compatible alert styles out of the box like this:

```javascript
// alert-info
growlNotifications.add('Hello world', 'info');

// alert-warning
growlNotifications.add('Hello world', 'warning');

// alert-danger
growlNotifications.add('Hello world', 'danger');

// alert-success
growlNotifications.add('Hello world', 'success');
```

You can change this default behavior using the `cssPrefix()` method of the `growlNotificationsProvider`.

### Using the notifications property of the growlNotifications service

First assign the `growlNotifications` service to your `$scope`:

```javascript
angular.controller('someCtrl', ['growlNotifications', '$scope', function(growlNotifications, $scope){

    // Make sure the service can be accessed from within the view
    $scope.growlNotifications = growlNotifications;

}]);
```

Then loop over the `notifications` property in your view template:

```html
<ul class="list-unstyled">
    <li ng-repeat="(id, notification) in growlNotifications.notifications">
        <div class="alert alert-{{notification.type}}">
            {{notification.message}}
        </div>
    </li>
</ul>
```

This allows you to create virtually any markup you could possible think of.

## F.A.Q.

*The console log shows an error: "Attempting to use an unsafe value in a safe context"*

This happens when the ngSanitize module isn't loaded. Make sure the module is loaded.

## Change log

### v0.7.0

- Added support for custom css prefix (defaults to Bootstrap alert)

### v0.6.0

- The growl-notifications directive now uses an isolate scope

### v0.5.0

- Added support for custom options in growl-notification directive
- Updated demo page

### v0.4.0

- Added $animate support
- Updated demo page

### v0.3.0

- Added dist directory with pre-built library files
- Added demo page

### v0.2.0

- Added `growl-notification` directive to conveniently add notifications from within HTML markup
- Added `growl-notifications` directive to conveniently display notifications from within HTML markup
- Added documentation

### v0.1.0

- Initial version


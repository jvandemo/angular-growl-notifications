# Growl notifications for AngularJS

Notifications logically belong inside the view layer of your application.

Most existing growl systems require you to add notifications using JavaScript inside your controller layer.

This module allows you to declaratively create notifications using directives only, supporting both inline expressions and HTML.

Think Growl, but in AngularJS directives. Oh, and Bootstrap compatible too.

## Demo

Check out this [online demo](http://jvandemo.github.io/angular-growl-notifications/demo/).

## Example

Add the following markup to your view template:

```html
<!-- The growl-notifications directive acts as a container to capture
the notifications so you can style them any way you like in your CSS-->
<div growl-notifications></div>

<!-- The growl-notification directive adds a notification -->
<div growl-notification>
    I will pop up as a growl notification and automatically disappear after 5 seconds.
</div>
```

That's it, you now have a fully working growl notification system that will show a notification when the page is loaded!

Now let's add a notification that is only shown when a certain condition is met:

```html
<!-- The growl-notification directive supports AngularJS conditional directives -->
<div growl-notification ng-if="formHasBeenSubmitted">
    Thank you, we will contact you shortly.
</div>
```
You can even use AngularJS expressions inside the notification like this:
```html
<!-- The growl-notification directive supports AngularJS expressions -->
<div growl-notification ng-if="formHasBeenSubmitted">
    Thank you {{firstName}}, we will contact you shortly.
</div>
```
and top it off completely with custom HTML markup:
```html
<!-- The growl-notification directive supports HTML markup -->
<div growl-notification ng-if="formHasBeenSubmitted">
    <strong>Thank you {{firstName}}</strong>, we will contact you shortly.
</div>
```

## Installation

Using bower:

```shell
$ bower install angular-growl-notifications
```

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

## The growl-notifications directive

The `growl-notifications` directive allows you to display the notifications anywhere in your HTML:

```html
<div growl-notifications></div>
```

By default, the element is transformed behind the scenes to:

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

```html
<div growl-notification="{ type: 'warning' }">
    A warning
</div>

<div growl-notification="{ type: 'success' }">
    A success message
</div>
```
You can finetune the behavior of the `growl-notifications` directive using the `growlNoticationsProvider`. Check out the `growlNoticationsProvider` section for more information.

## The growl-notification directive

The `growl-notification` directive allows you to create notifications from within your HTML markup:

```html
<div growl-notification>
    Awesome, I will automatically disappear after 5 seconds.
</div>
```
The notification is sent to a central `growlNotifications` service that manages all notifications and removes them form your page when they expire.

The `growl-notification` directive accepts an object literal value to specifiy individual options:

- `type`: the notification type, can be any string and can be used to filter notifications or style them by type, defaults to 'info'
- `ttl`: the number of milliseconds to wait before the notification is removed, defaults to 5000 (5 seconds)

For example:

```html
<div growl-notification="{ttl: 6000, type: 'danger'}">
    Message that will have class "alert-danger" and will automatically disappear after 6 seconds
</div>

<div growl-notification="{ttl: 6000, type: 'success'}">
    Message that will have class "alert-success" and will automatically disappear after 8 seconds
</div>
```

You can use conditional attributes such as `ng-if` to create notifications that only appear when a condition is met:

```html
<div growl-notification ng-if="formSubmitted">
    Congratulations, the form was submitted successfully!
</div>
```

You can use expressions to show data from your scope:

```html
<div growl-notification>
    Hello {{name}}

    This will display "Hello world" if $scope.name = "world"
</div>
```

Expressions are evaluated against the scope where the `growl-notification` directive is used, not where
the `growl-notifications` is placed.

This is more intuïtive as it refers to the scope of the piece of the DOM where you are writing the markup for the notification.

Finally you can also use HTML markup to make your notifications look exactly the way you want them to:

```html
<div growl-notification>
    <b>Hello bold {{name}}</b>
</div>
```

To allow HTML to be used inside the directive, the `ngSanitize` module is required, hence the need
to specify it as a dependent module in your AngularJS app.

## The growlNotifications service

Although you can create a fully working growl notification system using directives only, Growl notifications for AngularJS also offers a service you can interact with.

The growlNotifications service centrally manages the notifications and can be injected anywhere in your AngularJS app.

### Creating notifications

To create a notification from within a controller:

```javascript
angular.controller('someCtrl', ['growlNotifications', function(growlNotifications){

    // Add a notification
    growlNotifications.add('Hello world');

}]);
```

The `add(message, type, ttl)` method accepts 3 parameters:

- *message*: the message to display inside the HTML, can contain expressions and HTML
- *type*: the notification type, can be any string and can be used to filter notifications or style them by type, defaults to 'info'
- *ttl*: the number of milliseconds to wait before the notification is removed, defaults to 5000 (5 seconds)

```javascript
// Add a notification with type 'info' that is removed after 5 seconds
growlNotifications.add('Hello world');

// Add a notification with type 'warning' that is removed after 5 seconds
growlNotifications.add('Hello world', 'warning');

// Add a notification with type 'warning' that is removed after 2 seconds
growlNotifications.add('Hello world', 'warning', 2000);
```

### Displaying notifications

First assign the `growlNotifications.notifications` property to your `$scope`:

```javascript
angular.controller('someCtrl', ['growlNotifications', '$scope', function(growlNotifications, $scope){

    // Make sure the notifications can be accessed from within the view
    $scope.notifications = growlNotifications.notifications;

}]);
```

Then loop over the `notifications` property in your view template:

```html
<ul class="list-unstyled">
    <li ng-repeat="(id, notification) in notifications">
        <div class="alert alert-{{notification.type}}">
            {{notification.message}}
        </div>
    </li>
</ul>
```

This allows you to create virtually any markup you could possibly think of.

## The growlNotificationsProvider

The `growlNotificationsProvider` allows you to customize the behavior of the `growlNotifications` service:

```javascript
angular.module('yourApp')
    .config(['growlNotificationsProvider', function(growlNotificationsProvider){
    
        // Change the css prefix so growl notifications generated by the growl-notifications
        // directive have a class of "growl growl-{{type}}" instead of the default "alert alert-{{type}}"
        growlNotificationsProvider.cssPrefix('growl');
        
        // Change the default ttl for a notification to 10000ms instead of the default 5000ms
        growlNotificationsProvider.ttl(1000);
        
        // Change the default notification type to "warning" instead of the default "info"
        growlNotificationsProvider.type('warning');
    
    }]);
```

## F.A.Q.

#### The console log shows an error: "Attempting to use an unsafe value in a safe context"

This happens when the ngSanitize module isn't loaded. Make sure the module is loaded.

#### I added the notifications to my website but can't see them anywhere on the page

The notifications are probably rendered in the DOM (you can check using developer tools) but are probably not visible in your layout.

If you want the notifications to appear on the top right of your screen above your existing content, you can use a few CSS rules like this:

```css
div.growl-notifications {
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 1000;
  width: 200px;
}
```

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

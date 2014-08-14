# Quick start

Learn how to create Mac OS X like pop-up notifications in your AngularJS application.

## Install the library

Download the code from [GitHub](https://github.com/jvandemo/angular-growl-notifications) or install it using bower: 

```sh
$ bower install angular-growl-notifications
```

Load the library in your markup:

```html
<script type="text/javascript" src="angular.js"></script>
<script type="text/javascript" src="growl-notifications.js"></script>
```

Load the `growlNotifications` module in your AngularJS application:

```javascript
angular.module('yourApp', ['growlNotifications']);
```

The library is now loaded in your AngularJS application.

## Specify where you want to render the notifications

Before you can create notifications, you need to add the `growl-notifications` (plural) directive to your markup.

This directive allows you to control where the notifications are rendered in your DOM in case your application requires special behavior.

In most cases you should simply add it as the first element inside the `body` element:

```html
<body>
  <growl-notifications></growl-notifications>
  
  ...
</body>
```

Check out the [growl-notifications directive documentation](directives/growl-notifications) for more information.

## Create notifications

You can now use the `growl-notification` (singular) directive to create notifications in your application:

```html
<growl-notification>
  Hello world
</growl-notification>
```

Check out the [growl-notification directive documentation](directives/growl-notification) for all available options.

## Customize look and feel

By default no styling is applied so you can completely control the look and feel of the notifications in your application's stylesheet.

The possibilities are endless, for example:

```html
growl-notification{
  border: 1px solid black;
  padding: 15px 30px;
  margin-bottom: 15px;
}
```

Visit the [examples](../examples) page for more sample code.

## That's it

You now have a working notification system in your AngularJS application.
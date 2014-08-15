# The growl-notification directive

Directive to create notifications.

## Basic usage

Display a notification when the page loads:

```markup
<growl-notification>
  Hello world
</growl-notification>
```

## Specifying the TTL

Control how long an individual notification is displayed by using the `ttl` attribute:

- *value*: expression, default 5000 

```markup
<!-- Notification will automatically disappear after 10 seconds -->
<growl-notification ttl="10000">
  Hello world
</growl-notification>
```

## Conditional notifications

Add conditional logic to your notifications using existing AngularJS directives like `ng-if`:

```markup
<!-- The notification will not be shown on page load (assuming success is false by default) -->
<growl-notification ng-if="success">
  Hello world
</growl-notification>

<!-- Clicking the button will show the notification -->
<button ng-click="success = true">Show notification</button>
```

## Embedding HTML

Use HTML to customize the content of the notification:

```markup
<growl-notification>
  Hello <strong>world</strong>
</growl-notification>
```

## Embedding expressions

Use AngularJS expressions inside the directive:

```markup
<growl-notification ttl="10000">
  Hello {{name}}
</growl-notification>
```

Expressions are evaluated against the scope of the current `growl-notification` directive (and not against the scope of the `growl-notifications` directive where they are displayed). This is most intuitive.

Suppose you have 2 controllers:

```javascript
function FirstCtrl($scope){
  $scope.name = "Jazz"
}
function SecondCtrl($scope){
  $scope.name = "Zeno"
}
```
then:

```markup
<!-- Block of DOM with scope of FirstCtrl -->
<div ng-controller="FirstCtrl">
  <growl-notifications></<growl-notifications>
</div>

<!-- Block of DOM with scope of SecondCtrl -->
<div ng-controller="SecondCtrl">

  <!-- The scope of SecondCtrl will be used here to evaluate the {{name}} expression -->
  <!-- Thus "Hello Zeno" will be displayed -->
  <growl-notification>
    Hello {{name}}
  </growl-notification>    
</div>
```

will display "Hello Zeno".

## $growlNotification

There is a special `$growlNotification` object available inside the directive scope that allows you to communicate with the directive from within your expressions.

### $growlNotification.remove()

Remove the notification immediately.

This is convenient if you want to display a "close" link inside the notification:

```markup
<growl-notification>
    <a href="#" ng-click="$growlNotification.remove()">Close me</a>
<growl-notification>
```
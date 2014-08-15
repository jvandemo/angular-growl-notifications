# The growl-notifications directive

Directive to specify where the notifications need be rendered in the DOM.

This directive **must be present in your page** or no notifications will be rendered.

## Basic usage

If not sure where to put it, just add it as the first element inside the body element:

```markup
<body>
  <growl-notifications></growl-notifications>
  
  ...
</body>
```

Technically, this directive will register itself with the `growlNotification` service as the *output* element where all notifications need to be rendered.
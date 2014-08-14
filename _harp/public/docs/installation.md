# Installation

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
angular.module('yourApp', ['growlNotifications', 'ngSanitize']);
```

That's it, you can now create growl notifications using the included directives.
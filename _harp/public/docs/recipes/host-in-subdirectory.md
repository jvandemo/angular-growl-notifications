# How to host your website in a subdirectory

Hosting a static file in a subdirectory may cause problems with your paths.

Bootstrap boilerplate for Harp includes a `baseUrl` global variable in `harp.json` to fix this:

```javascript
{
  "globals": {
    "baseUrl": "",
    "name": "Bootstrap boilerplate for Harp"
  }
}
```

By default it is set to `""`, which is perfect when serving your website from the root of a domain or using Harp server.

When you want to host your website statically in a subdirectory, you can change this value to the subdirectory path:

```javascript
{
  "globals": {
    "baseUrl": "/subdirectory",
    "name": "Bootstrap boilerplate for Harp"
  }
}
```

All links will now be prepended with `/subdirectory`.

You can access the `baseUrl` value using the [globals](http://harpjs.com/docs/development/globals) in your own view templates as well to construct links that are "subdirectory safe".
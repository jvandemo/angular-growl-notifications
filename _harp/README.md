# Bootstrap boilerplate for Harp

Allows you to generate a Bootstrap enabled website in seconds using [Harp](http://harpjs.com):

- Includes documentation
- Offers theme support that doesn't interfere with Bootstrap updates
- Allows you to easily customize Bootstrap for each individual theme
- Uses Bower to install Bootstrap (and automate updates)
- Supports hosting in a subdirectory using a `baseUrl` variable
- Prevents CSS bloat by allowing you to only include the Bootstrap components that you really need
- Includes a showcase page that allows you to conveniently see what the Bootstrap components look like while your are customizing your Bootstrap styles

## Demo

A clean installation of the boilerplate looks like this: [http://jvandemo.github.io/hb-bootstrap/](http://jvandemo.github.io/hb-bootstrap/)

## Installation

First make sure you have Harp and Bower installed:

```sh
$ sudo npm install -g harp
$ sudo npm install -g bower
```

Then initialize the boilerplate:

```sh
$ harp init -b jvandemo/hb-bootstrap myproject
```

Change the directory to the new `myproject` directory:

```sh
$ cd myproject
```

Download Bootstrap using bower:

```sh
$ bower install
```

Start the harp server from your project directory:

```sh
$ harp server
```

And navigate to `http://localhost:9000` in your browser:

![](http://i.imgur.com/n9bcerv.png)

## Documentation

The documentation is included in the boilerplate for your convenience (at the same time it demonstrates how you can easily create new layouts in your website):

![](http://i.imgur.com/mJTLMQz.png)

## Showcase page

The boilerplate includes a showcase page to easily see what the Bootstrap components look like while your are customizing your Bootstrap styles:

![](http://i.imgur.com/g43CZge.png)

## Changelog

### v0.4.0

- Added support for `baseUrl`

### v0.3.0

- Added documentation as part of boilerplate
- Update README.md

### v0.2.0

- Added support for customizing Bootstrap
- Added two sample themes: default and flat

### v0.1.0

- Initial boilerplate


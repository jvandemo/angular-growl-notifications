# How to create a custom theme

Bootstrap boilerplate for Harp allows you to create custom themes.

You can create as many themes as you like.

Two sample themes have been included in the `public/css/themes` directory.

The quickest way to create a new theme is to just copy the directory of one the sample themes.

## Theme specific files

Each sample theme contains 3 files:

- `_variables`: variables to be used by Bootstrap
- `_bootstrap`: list of bootstrap components you wish to enable for the theme
- `theme.less`: theme specific styles

Although you can use any technique you like to create your own theme, this structure is highly recommended.

It allows you to reduce unnecessary CSS bloat by specifically restricting the set of Bootstrap components you wish to include in your theme.

## Main global.less

The main `global.less` file in the `public/css` is the file that is actually used in the default layout.

It simply imports the theme of your choice and allows you to add additional styles that are not theme specific:

```less
// Import flat bootstrap theme
@import "themes/flat/theme";

// Supply global styles
body{
  padding-top: 70px;
}

// You can also overwrite styles from the theme
style-from-theme{
  color: black;
}
```
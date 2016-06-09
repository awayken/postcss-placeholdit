# PostCSS PlaceholdIt [![Build Status][ci-img]][ci]

[PostCSS] plugin that uses the https://placehold.it service as a placeholder for broken background images. You provide the background image you want to use as one parameter, and then provide a placeholder size for the second parameter.

_Note:_ This plugin is a work in progress.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/awayken/postcss-placeholdit.svg
[ci]:      https://travis-ci.org/awayken/postcss-placeholdit

```css
.foo {
    background-image: placeholdit("/brokenimage.jpg", "400x400");
}
```

If the background image exists:
```css
.foo {
    background-image: url("/brokenimage.jpg");
}
```

If the background image doesn't exists:
```css
.foo {
    background-image: url("https://placehold.it/400x400");
}
```

## Usage

```js
postcss([ require('postcss-placeholdit') ])
```

## Options

### domain

You can pass a domain option to the plugin so that the plugin knows what absolute URL to use to request your image.

Default: *http://localhost*

_Note:_ The plugin will only prepend a domain if the background image doesn't have an http or https protocol specified.

```js
postcss([ required('postcss-placeholdit')({ domain: 'http://example.com' }) ])
```

```css
.foo {
    /* Will request http://example.com/brokenimage.jpg */
    background-image: placeholdit("/brokenimage.jpg", "400x400");
}

.foo {
    /* Will request http://example.org/brokenimage.jpg */
    background-image: placeholdit("http://example.org/brokenimage.jpg", "400x400");
}
```

See [PostCSS] docs for examples for your environment.

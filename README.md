# Generate CSS [![npm Version](https://img.shields.io/npm/v/generate-css?cacheSeconds=1800)](https://www.npmjs.com/package/generate-css) [![build](https://github.com/yuanqing/generate-css/workflows/build/badge.svg)](https://github.com/yuanqing/generate-css/actions?query=workflow%3Abuild) ![stability experimental](https://img.shields.io/badge/stability-experimental-red)

> Dynamically generate functional CSS classes from HTML and JavaScript source files

- Style your app via a class shorthand, with support for pseudo-classes and media-queries
- Zero unused CSS; functional CSS classes are only included in the generated CSS file if they are actually used

## Example

Given an `example.html` file:

```html
<link href="style.css" rel="stylesheet">
<button class="bg-orange color-white bg-black:hover font font-bold px-4 py-2 rounded-full">Button</button>
```

And the following `generate-css.config.json` file:

```json
{
  "reset": true,
  "theme": {
    "baseFontSize": {
      "default": "16px"
    },
    "color": {
      "black": "#000000",
      "orange": "#ff5533",
      "white": "#ffffff"
    },
    "fontFamily": {
      "default": "Helvetica, Arial, sans-serif"
    },
    "fontWeight": {
      "bold": "bolder"
    },
    "space": "0.5rem"
  }
}
```

Do:

```
$ npx generate-css example.html --output style.css
```

This will result in the following `style.css` file (with the opening reset rules omitted):

```scss
// ...reset rules...

.bg-black\:hover:hover {
  background-color: #000;
}
.bg-orange {
  background-color: #f53;
}
.color-white {
  color: #fff;
}
.font {
  font-family: Helvetica, Arial, sans-serif;
}
.font-bold {
  font-weight: bolder;
}
.px-4 {
  padding-right: 2rem;
  padding-left: 2rem;
}
.py-2 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.rounded-full {
  border-radius: 9999px;
}
```

## CLI

```
$ npx generate-css --help

  Usage
    $ generate-css <pattern> [options]

  Options
    -a, --append     Glob pattern for CSS files to append to the generated CSS file
    -c, --config     Path to a `generate-css` configuration file  (default generate-css.config.json)
    -m, --minify     Whether to minify generated CSS file  (default false)
    -o, --output     Path to write the generated CSS file
    -p, --prepend    Glob pattern for CSS files to prepend to the generated CSS file
    -w, --watch      Whether to automatically generate a CSS file on changes to the source files  (default false)
    -v, --version    Displays current version
    -h, --help       Displays this message

```

## Prior art

- Naming conventions of the functional CSS classes is heavily inspired by [Tailwind](https://tailwindcss.com/) and [Tachyons](https://tachyons.io/)

## License

[MIT](/LICENSE.md)

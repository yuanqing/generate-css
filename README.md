# Generate CSS [![npm Version](https://img.shields.io/npm/v/generate-css?cacheSeconds=1800)](https://www.npmjs.com/package/generate-css) [![build](https://github.com/yuanqing/generate-css/workflows/build/badge.svg)](https://github.com/yuanqing/generate-css/actions?query=workflow%3Abuild) ![stability experimental](https://img.shields.io/badge/stability-experimental-red)

> Dynamically generate functional CSS classes from HTML and JavaScript source files

## Features

- Style your HTML using functional CSS classes, with support for applying styles specific to pseudo-classes (eg. `hover:bg-black`, `group-hover:bg-black`) and breakpoints (eg. `sm@bg-black`)
- Guarantees zero unused CSS; classes are only included in the generated CSS file if they are actually used

## Example

Given the following `example.html` file:

```html
<link href="style.css" rel="stylesheet">
<button class="bg-blue color-white font font-bold px-4 py-2 rounded-full hover:bg-black">Button</button>
```

…and the following `generate-css.config.json` configuration file:

```json
{
  "reset": true,
  "theme": {
    "baseFontSize": {
      "default": "16px"
    },
    "baseSpace": "0.5rem",
    "color": {
      "black": "#000",
      "blue": "#00f",
      "white": "#fff"
    },
    "fontFamily": {
      "default": "Helvetica, Arial, sans-serif"
    },
    "fontWeight": {
      "bold": "bolder"
    }
  }
}
```

Do:

```
$ npx generate-css example.html --output style.css
```

This will generate the following `style.css` file (with the opening reset rules omitted):

```
// ...reset rules...

html {
  font-size: 16px;
}
.hover\:bg-black:hover {
  background-color: #000;
}
.bg-blue {
  background-color: #00f;
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

Note that:

- With `theme.baseFontSize.default` set to `16px`, `font-size: 16px;` is applied on `html`.
- With `theme.baseSpace` set to `0.5rem`, the padding value of `px-4` is `2rem` (ie. `0.5rem` × `4`), and the padding value of `py-2` is `1rem` (ie. `0.5rem` × `2`).

## Usage

### General concepts

See the [full list of functional CSS classes](/docs/css.md#readme) currently supported by Generate CSS.

There are 2 types of functional CSS classes:

#### Classes *without* a `${key}`

For these classes, the value used in the generated CSS would generally be resolved from `theme[propertyName].default`.

#### Classes *with* a dynamic `${key}`

For these classes, the value used in the generated CSS would generally be resolved from `theme[propertyName][key]`.

For certain CSS classes, if `theme[propertyName][key]` is `undefined`, the value used in the generated CSS might then be resolved using the following mapping (`resolveNumericValue(key)`):

Key | Resolved value | Example
:--|:--|:--
`auto` | `auto` | `w-auto` → `width: auto;`
`full` | `100%` | `w-full` → `width: 100%;`
`px` | `1px` | `w-px` → `width: 1px;`
`([0-9]+)px` | `$1px` | `w-8px` → `width: 8px;`
`([0-9]+)/([0-9]+)` | `($1 / $2 * 100)%` | `w-2/3` → `width: 66.666667%;`
`([0-9]+)` | `theme.baseSpace` × `$1` | `w-2` → `width: 2rem`<br>(assuming `theme.baseSpace` = `1rem`)

### Pseudo-class

To apply a style on an element for a particular pseudo-class state only, add the pseudo-class keyword followed by a `:` character (eg. `hover:`) *before* the functional CSS class name.

For example, using the class `hover:bg-black` would result in the following generated CSS:

```
.hover\:bg-black:hover {
  background-color: #000;
}
```

### Parent pseudo-class

To apply a style on an element for a particular parent pseudo-class state only, add the special parent pseudo-class keyword followed by a `:` character (eg. `parent-hover:`) *before* the functional CSS class name.

For example, using the class `parent-hover:bg-black` would result in the following generated CSS:

```
.parent:hover .parent-hover\:bg-black {
  background-color: #000;
}
```

### Breakpoints

Define breakpoints under the `theme.breakpoint` key in `generate-css.config.json`:

```json
{
  "theme": {
    // ...
    "breakpoint": {
      "sm": "540px",
      "md": "960px"
    }
  }
}
```

To apply a style on an element at a particular breakpoint and higher, add the name of the breakpoint followed by an `@` character (eg. `sm@`) *before* the functional CSS class name.

For example, using the class `sm@bg-black` would result in the following generated CSS:

```
@media (min-width: 540px) {
  .sm\@bg-black {
    background-color: #000;
  }
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
    -m, --minify     Whether to minify the generated CSS file  (default false)
    -o, --output     Path to write the generated CSS file
    -p, --prepend    Glob pattern for CSS files to prepend to the generated CSS file
    -w, --watch      Whether to automatically generate a CSS file on changes to the source files  (default false)
    -v, --version    Displays current version
    -h, --help       Displays this message

```

## Prior art

- The functional CSS class naming convention used in Generate CSS is heavily inspired by [Tailwind](https://tailwindcss.com/) and [Tachyons](https://tachyons.io/).

## License

[MIT](/LICENSE.md)

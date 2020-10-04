/*
border-radius

- `defaultValue` = `theme.borderRadius.default`
- `value` = `theme.borderRadius[key]` || `computeNumericValue(key)`

`.rounded` | `border-radius: ${defaultValue};`
`.rounded-t` | `border-top-left-radius: ${defaultValue};`<br>`border-top-right-radius: ${defaultValue};`
`.rounded-r` | `border-top-right-radius: ${defaultValue};`<br>`border-bottom-right-radius: ${defaultValue};`
`.rounded-b` | `border-bottom-left-radius: ${defaultValue};`<br>`border-bottom-right-radius: ${defaultValue};`
`.rounded-l` | `border-top-left-radius: ${defaultValue};`<br>`border-bottom-left-radius: ${defaultValue};`
`.rounded-tl` | `border-top-left-radius: ${defaultValue};`
`.rounded-tr` | `border-top-right-radius: ${defaultValue};`
`.rounded-bl` | `border-bottom-left-radius: ${defaultValue};`
`.rounded-br` | `border-bottom-right-radius: ${defaultValue};`
`.rounded-full` | `border-radius: 9999px;`
`.rounded-t-full` | `border-top-left-radius: 9999px;`<br>`border-top-right-radius: 9999px;`
`.rounded-r-full` | `border-top-right-radius: 9999px;`<br>`border-bottom-right-radius: 9999px;`
`.rounded-b-full` | `border-bottom-left-radius: 9999px;`<br>`border-bottom-right-radius: 9999px;`
`.rounded-l-full` | `border-top-left-radius: 9999px;`<br>`border-bottom-left-radius: 9999px;`
`.rounded-tl-full` | `border-top-left-radius: 9999px;`
`.rounded-tr-full` | `border-top-right-radius: 9999px;`
`.rounded-bl-full` | `border-bottom-left-radius: 9999px;`
`.rounded-br-full` | `border-bottom-right-radius: 9999px;`
`.rounded-${key}` | `border-radius: ${value};`
`.rounded-t-${key}` | `border-top-left-radius: ${value};`<br>`border-top-right-radius: ${value};`
`.rounded-r-${key}` | `border-top-right-radius: ${value};`<br>`border-bottom-right-radius: ${value};`
`.rounded-b-${key}` | `border-bottom-left-radius: ${value};`<br>`border-bottom-right-radius: ${value};`
`.rounded-l-${key}` | `border-top-left-radius: ${value};`<br>`border-bottom-left-radius: ${value};`
`.rounded-tl-${key}` | `border-top-left-radius: ${value};`
`.rounded-tr-${key}` | `border-top-right-radius: ${value};`
`.rounded-bl-${key}` | `border-bottom-left-radius: ${value};`
`.rounded-br-${key}` | `border-bottom-right-radius: ${value};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const borderRadius: Plugin = {
  createDeclarations: function ({
    matches,
    computeNumericValue
  }: {
    matches: RegExpMatchArray
    computeNumericValue: (
      value: string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
  }): { [property: string]: string } {
    const borderRadius =
      matches[2] === 'full'
        ? '9999px'
        : computeNumericValue(matches[2], ['borderRadius'])
    if (borderRadius === null) {
      throw new Error(`Invalid border radius: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 't': {
        return {
          'border-top-left-radius': borderRadius,
          'border-top-right-radius': borderRadius
        }
      }
      case 'r': {
        return {
          'border-bottom-right-radius': borderRadius,
          'border-top-right-radius': borderRadius
        }
      }
      case 'b': {
        return {
          'border-bottom-left-radius': borderRadius,
          'border-bottom-right-radius': borderRadius
        }
      }
      case 'l': {
        return {
          'border-bottom-left-radius': borderRadius,
          'border-top-left-radius': borderRadius
        }
      }
      case 'tl': {
        return {
          'border-top-left-radius': borderRadius
        }
      }
      case 'tr': {
        return {
          'border-top-right-radius': borderRadius
        }
      }
      case 'bl': {
        return {
          'border-bottom-left-radius': borderRadius
        }
      }
      case 'br': {
        return {
          'border-bottom-right-radius': borderRadius
        }
      }
    }
    return {
      'border-radius': borderRadius
    }
  },
  regex: /^rounded(?:-([trbl]|[tb][lr]))?(?:-(.+))?$/
}

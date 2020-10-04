/*
border-width

- `defaultValue` = `theme.borderWidth.default`
- `value` = `theme.borderWidth[key]` || `resolveNumericValue(key)`

`.b` | `border-width: ${defaultValue};`
`.bx` | `border-left-width: ${defaultValue};`<br>`border-right-width: ${defaultValue};`
`.by` | `border-top-width: ${defaultValue};`<br>`border-bottom-width: ${defaultValue};`
`.bt` | `border-top-width: ${defaultValue};`
`.br` | `border-right-width: ${defaultValue};`
`.bb` | `border-bottom-width: ${defaultValue};`
`.bl` | `border-left-width: ${defaultValue};`
`.b-${key}` | `border-width: ${value};`
`.bx-${key}` | `border-left-width: ${value};`<br>`border-right-width: ${value};`
`.by-${key}` | `border-top-width: ${value};`<br>`border-bottom-width: ${value};`
`.bt-${key}` | `border-top-width: ${value};`
`.br-${key}` | `border-right-width: ${value};`
`.bb-${key}` | `border-bottom-width: ${value};`
`.bl-${key}` | `border-left-width: ${value};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const borderWidth: Plugin = {
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
    const borderWidth = computeNumericValue(matches[2], ['borderWidth'])
    if (borderWidth === null) {
      throw new Error(`Invalid border width: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 'x': {
        return {
          'border-left-width': borderWidth,
          'border-right-width': borderWidth
        }
      }
      case 'y': {
        return {
          'border-bottom-width': borderWidth,
          'border-top-width': borderWidth
        }
      }
      case 't': {
        return {
          'border-top-width': borderWidth
        }
      }
      case 'r': {
        return {
          'border-right-width': borderWidth
        }
      }
      case 'b': {
        return {
          'border-bottom-width': borderWidth
        }
      }
      case 'l': {
        return {
          'border-left-width': borderWidth
        }
      }
    }
    return {
      'border-width': borderWidth
    }
  },
  regex: /^b([xytrbl])?(?:-(.+))?$/
}

/*
padding

defaultValue = theme.padding.default || theme.space.default
value = theme.padding[key] || theme.space[key] || computeNumericValue(key)

`.p` | `padding: ${defaultValue};`
`.px` | `padding-left: ${defaultValue};`<br>`padding-right: ${defaultValue};`
`.py` | `padding-top: ${defaultValue};`<br>`padding-bottom: ${defaultValue};`
`.pt` | `padding-top: ${defaultValue};`
`.pr` | `padding-right: ${defaultValue};`
`.pb` | `padding-bottom: ${defaultValue};`
`.pl` | `padding-left: ${defaultValue};`
`.px-${key}` | `padding-left: ${value};`<br>`padding-right: ${value};`
`.py-${key}` | `padding-top: ${value};`<br>`padding-bottom: ${value};`
`.pt-${key}` | `padding-top: ${value};`
`.pr-${key}` | `padding-right: ${value};`
`.pb-${key}` | `padding-bottom: ${value};`
`.pl-${key}` | `padding-left: ${value};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const padding: Plugin = {
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
    const value = computeNumericValue(matches[2], ['padding', 'space'])
    if (value === null) {
      throw new Error(`Invalid padding: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 'x': {
        return {
          'padding-left': value,
          'padding-right': value
        }
      }
      case 'y': {
        return {
          'padding-bottom': value,
          'padding-top': value
        }
      }
      case 't': {
        return {
          'padding-top': value
        }
      }
      case 'r': {
        return {
          'padding-right': value
        }
      }
      case 'b': {
        return {
          'padding-bottom': value
        }
      }
      case 'l': {
        return {
          'padding-left': value
        }
      }
    }
    return {
      padding: value
    }
  },
  regex: /^p([xytrbl])?(?:-(.+))?$/
}

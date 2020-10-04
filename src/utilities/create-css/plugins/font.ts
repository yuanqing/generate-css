/*
font-family

`.font` | `font-family: ${theme.fontFamily.default};`
`.font-${key}` | `font-family: ${theme.fontFamily[key]};`
---
font-size

`.font-${key}` | `font-size: ${theme.fontSize[key]};`
---
font-weight

`.font-${key}` | `font-weight: ${theme.fontWeight[key]};`
*/

import { Plugin, Theme, ThemeKeys } from '../../../types'

export const font: Plugin = {
  createDeclarations: function ({
    computeNumericValue,
    matches,
    theme
  }: {
    computeNumericValue: (
      value: string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    if (typeof matches[1] === 'undefined') {
      if (typeof theme.fontFamily === 'undefined') {
        throw new Error('`theme.fontFamily` not defined in configuration')
      }
      const fontFamily = theme.fontFamily.default
      if (typeof fontFamily === 'undefined') {
        throw new Error(
          '`theme.fontFamily.default` not defined in configuration'
        )
      }
      return {
        'font-family': `${fontFamily}`
      }
    }
    if (typeof theme.fontFamily !== 'undefined') {
      const fontFamily = theme.fontFamily[matches[1]]
      if (typeof fontFamily !== 'undefined') {
        return {
          'font-family': `${fontFamily}`
        }
      }
    }
    if (typeof theme.fontWeight !== 'undefined') {
      const fontWeight = theme.fontWeight[matches[1]]
      if (typeof fontWeight !== 'undefined') {
        return {
          'font-weight': `${fontWeight}`
        }
      }
    }
    const fontSize = computeNumericValue(matches[1], ['fontSize'])
    if (fontSize === null) {
      throw new Error(`Invalid font size: ${matches[1]}`)
    }
    return {
      'font-size': `${fontSize}`
    }
  },
  regex: /^font(?:-(.+))?$/
}

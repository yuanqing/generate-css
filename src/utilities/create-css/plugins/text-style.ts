/*
text style

`.text` | `font-size: ${theme.fontSize.default};`<br>`font-weight: ${theme.fontWeight.default};`<br>`letter-spacing: ${theme.letterSpacing.default};`<br>`line-height: ${theme.lineHeight.default};`
`.text-${key}` | `font-size: ${theme.fontSize[key]};`<br>`font-weight: ${theme.fontWeight[key]};`<br>`letter-spacing: ${theme.letterSpacing[key]};`<br>`line-height: ${theme.lineHeight[key]};`
*/

import { Plugin, Theme } from '../../../types'

export const textStyle: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    const result: { [property: string]: string } = {}
    const key = typeof matches[1] === 'undefined' ? 'default' : matches[1]
    if (typeof theme.fontSize !== 'undefined') {
      const fontSize = theme.fontSize[key]
      if (typeof fontSize !== 'undefined') {
        result['font-size'] = fontSize
      }
    }
    if (typeof theme.fontWeight !== 'undefined') {
      const fontWeight = theme.fontWeight[key]
      if (typeof fontWeight !== 'undefined') {
        result['font-weight'] = fontWeight
      }
    }
    if (typeof theme.letterSpacing !== 'undefined') {
      const letterSpacing = theme.letterSpacing[key]
      if (typeof letterSpacing !== 'undefined') {
        result['letter-spacing'] = letterSpacing
      }
    }
    if (typeof theme.lineHeight !== 'undefined') {
      const lineHeight = theme.lineHeight[key]
      if (typeof lineHeight !== 'undefined') {
        result['line-height'] = lineHeight
      }
    }
    if (Object.keys(result).length === 0) {
      throw new Error('Invalid text style')
    }
    return result
  },
  regex: /^text(?:-(.+))?$/
}

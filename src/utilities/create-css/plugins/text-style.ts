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
    const fontSize = theme.fontSize[matches[1]]
    if (typeof fontSize !== 'undefined') {
      result['font-size'] = fontSize
    }
    const fontWeight = theme.fontWeight[matches[1]]
    if (typeof fontWeight !== 'undefined') {
      result['font-weight'] = fontWeight
    }
    const letterSpacing = theme.letterSpacing[matches[1]]
    if (typeof letterSpacing !== 'undefined') {
      result['letter-spacing'] = letterSpacing
    }
    const lineHeight = theme.lineHeight[matches[1]]
    if (typeof lineHeight !== 'undefined') {
      result['line-height'] = lineHeight
    }
    if (Object.keys(result).length === 0) {
      throw new Error('Invalid text style')
    }
    return result
  },
  regex: /^text-(.+)$/
}

import { Config, Plugin } from '../../../../types'

export const textStyle: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const result: { [property: string]: string } = {}
    const fontSize = config.fontSize[matches[0]]
    if (typeof fontSize !== 'undefined') {
      result['font-size'] = fontSize
    }
    const fontWeight = config.fontWeight[matches[0]]
    if (typeof fontWeight !== 'undefined') {
      result['font-weight'] = fontWeight
    }
    const letterSpacing = config.letterSpacing[matches[0]]
    if (typeof letterSpacing !== 'undefined') {
      result['letter-spacing'] = letterSpacing
    }
    const lineHeight = config.lineHeight[matches[0]]
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

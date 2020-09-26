import { Config, Plugin } from '../../../types'

const digitsRegex = /^\d+$/

export const font: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    if (typeof matches[0] === 'undefined') {
      const fontFamily = config.theme.fontFamily.default
      if (fontFamily === 'undefined') {
        throw new Error(`Default font family not defined in configuration`)
      }
      return {
        'font-family': `${fontFamily}`
      }
    }
    const fontFamily = config.theme.fontFamily[matches[0]]
    if (typeof fontFamily !== 'undefined') {
      return {
        'font-family': `${fontFamily}`
      }
    }
    const fontWeight = config.theme.fontWeight[matches[0]]
    if (typeof fontWeight !== 'undefined') {
      return {
        'font-weight': `${fontWeight}`
      }
    }
    const fontSize = config.theme.fontSize[matches[0]]
    if (typeof fontSize !== 'undefined') {
      return {
        'font-size': `${fontSize}`
      }
    }
    if (digitsRegex.test(matches[0]) === true) {
      return {
        'font-size': `${matches[0]}px`
      }
    }
    throw new Error(`Invalid font size: ${matches[0]}`)
  },
  regex: /^font(?:-(.+))?$/
}

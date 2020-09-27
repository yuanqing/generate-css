import { Plugin, Theme } from '../../../types'

const digitsRegex = /^\d+$/

export const font: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    if (typeof matches[1] === 'undefined') {
      const fontFamily = theme.fontFamily.default
      if (fontFamily === 'undefined') {
        throw new Error(`Default font family not defined in configuration`)
      }
      return {
        'font-family': `${fontFamily}`
      }
    }
    const fontFamily = theme.fontFamily[matches[1]]
    if (typeof fontFamily !== 'undefined') {
      return {
        'font-family': `${fontFamily}`
      }
    }
    const fontWeight = theme.fontWeight[matches[1]]
    if (typeof fontWeight !== 'undefined') {
      return {
        'font-weight': `${fontWeight}`
      }
    }
    const fontSize = theme.fontSize[matches[1]]
    if (typeof fontSize !== 'undefined') {
      return {
        'font-size': `${fontSize}`
      }
    }
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'font-size': `${matches[1]}px`
      }
    }
    throw new Error(`Invalid font size: ${matches[1]}`)
  },
  regex: /^font(?:-(.+))?$/
}

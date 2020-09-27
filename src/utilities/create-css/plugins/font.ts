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
      if (typeof theme.fontFamily === 'undefined') {
        throw new Error('`theme.fontFamily` not defined in configuration')
      }
      const fontFamily = theme.fontFamily.default
      if (fontFamily === 'undefined') {
        throw new Error(`Default font family not defined in configuration`)
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
    if (typeof theme.fontSize !== 'undefined') {
      const fontSize = theme.fontSize[matches[1]]
      if (typeof fontSize !== 'undefined') {
        return {
          'font-size': `${fontSize}`
        }
      }
    }
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'font-size': `${matches[1]}px`
      }
    }
    throw new Error(`Invalid font class name: ${matches[0]}`)
  },
  regex: /^font(?:-(.+))?$/
}

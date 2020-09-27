import { Plugin, Theme } from '../../../types'

const digitsRegex = /^\d+$/

export const letterSpacing: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'letter-spacing': `${matches[1]}px`
      }
    }
    if (typeof theme.letterSpacing === 'undefined') {
      throw new Error('`theme.letterSpacing` not defined in configuration')
    }
    const letterSpacing = theme.letterSpacing[matches[1]]
    if (typeof letterSpacing === 'undefined') {
      throw new Error(`Invalid letter-spacing: ${matches[1]}`)
    }
    return {
      'letter-spacing': `${letterSpacing}`
    }
  },
  regex: /^(?:kerning|letter-spacing|tracking)-(.+)$/
}

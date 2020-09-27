import { Plugin, Theme } from '../../../types'

const digitsRegex = /\d+/

export const letterSpacing: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    const letterSpacing = theme.letterSpacing[matches[1]]
    if (typeof letterSpacing !== 'undefined') {
      return {
        'letter-spacing': `${letterSpacing}`
      }
    }
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'letter-spacing': `${matches[1]}px`
      }
    }
    throw new Error(`Invalid letter-spacing: ${matches[1]}`)
  },
  regex: /^(?:kerning|letter-spacing|tracking)-(.+)$/
}

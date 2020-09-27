import { Plugin, Theme } from '../../../types'

const digitsRegex = /^\d+$/

export const lineHeight: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'line-height': `${matches[1]}px`
      }
    }
    if (typeof theme.lineHeight === 'undefined') {
      throw new Error('`theme.lineHeight` not defined in configuration')
    }
    const lineHeight = theme.lineHeight[matches[1]]
    if (typeof lineHeight === 'undefined') {
      throw new Error(`Invalid line-height: ${matches[1]}`)
    }
    return {
      'line-height': `${lineHeight}`
    }
  },
  regex: /^(?:leading|line-height)-(.+)$/
}

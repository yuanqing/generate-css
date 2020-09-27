import { Plugin, Theme } from '../../../types'

const digitsRegex = /\d+/

export const lineHeight: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    const lineHeight = theme.lineHeight[matches[1]]
    if (typeof lineHeight !== 'undefined') {
      return {
        'line-height': `${lineHeight}`
      }
    }
    if (digitsRegex.test(matches[1]) === true) {
      return {
        'line-height': `${matches[1]}px`
      }
    }
    throw new Error(`Invalid line-height: ${matches[1]}`)
  },
  regex: /^(?:leading|line-height)-(.+)$/
}

import { Config, Plugin } from '../../../../types'

const digitsRegex = /\d+/

export const letterSpacing: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const letterSpacing = config.letterSpacing[matches[0]]
    if (typeof letterSpacing !== 'undefined') {
      return {
        'letter-spacing': `${letterSpacing}`
      }
    }
    if (digitsRegex.test(matches[0]) === true) {
      return {
        'letter-spacing': `${matches[0]}px`
      }
    }
    throw new Error(`Invalid letter-spacing: ${matches[0]}`)
  },
  regex: /^(?:kerning|letter-spacing|tracking)-(.+)$/
}

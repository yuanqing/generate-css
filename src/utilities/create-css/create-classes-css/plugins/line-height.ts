import { Config, Plugin } from '../../../../types'

const digitsRegex = /\d+/

export const lineHeight: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const lineHeight = config.lineHeight[matches[0]]
    if (typeof lineHeight !== 'undefined') {
      return {
        'line-height': `${lineHeight}`
      }
    }
    if (digitsRegex.test(matches[0]) === true) {
      return {
        'line-height': `${matches[0]}px`
      }
    }
    throw new Error(`Invalid line-height: ${matches[0]}`)
  },
  regex: /^(?:leading|line-height)-(.+)$/
}

import { Config, Plugin } from '../../../types'

const digitsRegex = /^\d+$/

export const fontSize: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const fontSize = config.fontSize[matches[0]]
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
  regex: /^text-(.+)$/
}

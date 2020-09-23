import { Config, Plugin } from '../../../types'

export const fontSize: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const fontSize = config.fontSize[matches[0]]
    if (typeof fontSize === 'undefined') {
      throw new Error(`Invalid font size: ${matches[0]}`)
    }
    return {
      'font-size': `${fontSize}`
    }
  },
  regex: /^text-(.+)$/
}

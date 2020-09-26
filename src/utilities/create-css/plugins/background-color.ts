import { Config, Plugin } from '../../../types'

export const backgroundColor: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const color = config.theme.color[matches[0]]
    if (typeof color === 'undefined') {
      throw new Error(`Invalid background color: ${matches[0]}`)
    }
    return {
      'background-color': `${color}`
    }
  },
  regex: /^bg-(.+)$/
}

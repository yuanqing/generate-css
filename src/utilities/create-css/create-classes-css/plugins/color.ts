import { Config, Plugin } from '../../../../types'

export const color: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const color = config.theme.color[matches[0]]
    if (typeof color === 'undefined') {
      throw new Error(`Invalid color: ${matches[0]}`)
    }
    return {
      color: `${color}`
    }
  },
  regex: /^color-(.+)$/
}

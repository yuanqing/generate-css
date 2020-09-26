import { Config, Plugin } from '../../../../types'

export const borderColor: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const borderColor = config.theme.color[matches[0]]
    if (typeof borderColor === 'undefined') {
      throw new Error(`Invalid border color: ${matches[0]}`)
    }
    return {
      'border-color': `${borderColor}`
    }
  },
  regex: /^border-(.+)$/
}

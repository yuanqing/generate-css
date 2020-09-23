import { Config, Plugin } from '../../../types'

export const fontWeight: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    const fontWeight = config.fontWeight[matches[0]]
    if (typeof fontWeight === 'undefined') {
      throw new Error(`Invalid font weight: ${matches[0]}`)
    }
    return {
      'font-weight': `${fontWeight}`
    }
  },
  regex: /^font-(.+)$/
}

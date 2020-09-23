import { Config, Plugin } from '../../../types'

export const fontFamily: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    config: Config
  ): { [property: string]: string } {
    if (typeof matches[0] === 'undefined') {
      const fontFamily = config.fontFamily.default
      if (fontFamily === 'undefined') {
        throw new Error(`Default font family not defined in configuration`)
      }
      return {
        'font-family': `${fontFamily}`
      }
    }
    const fontFamily = config.fontFamily[matches[0]]
    if (typeof fontFamily === 'undefined') {
      throw new Error(`Invalid font family: ${matches[0]}`)
    }
    return {
      'font-family': `${fontFamily}`
    }
  },
  regex: /^font(?:-(.+))?$/
}

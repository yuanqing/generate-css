import { Config, Plugin } from '../../../types'

export const widthAndHeight: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    _: Config,
    formatValue: (value: string) => null | string
  ): { [property: string]: string } {
    const prefix = typeof matches[0] === 'undefined' ? '' : matches[0]
    const suffix = matches[1] === 'w' ? 'width' : 'height'
    const value = formatValue(matches[2])
    if (value === null) {
      throw new Error(`Invalid value: ${matches[2]}`)
    }
    return {
      [`${prefix}${suffix}`]: value
    }
  },
  regex: /^(max)?([wh])-(.+)$/
}

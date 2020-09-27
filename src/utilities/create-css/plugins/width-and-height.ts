import { Plugin } from '../../../types'

export const widthAndHeight: Plugin = {
  createDeclarations: function ({
    matches,
    formatValue
  }: {
    matches: RegExpMatchArray
    formatValue: (value: string) => null | string
  }): { [property: string]: string } {
    const prefix = typeof matches[1] === 'undefined' ? '' : `${matches[1]}-`
    const suffix = matches[2] === 'w' ? 'width' : 'height'
    const value = formatValue(matches[3])
    if (value === null) {
      throw new Error(`Invalid ${prefix} value: ${matches[3]}`)
    }
    return {
      [`${prefix}${suffix}`]: value
    }
  },
  regex: /^(max)?([wh])-(.+)$/
}

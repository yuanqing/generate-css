import { Config, Plugin } from '../../../types'

export const marginAndPadding: Plugin = {
  createDeclarations: function (
    matches: Array<string>,
    _: Config,
    formatValue: (value: string) => null | string
  ): { [property: string]: string } {
    const prefix = matches[0] === 'm' ? 'margin' : 'padding'
    const value = formatValue(matches[2])
    if (value === null) {
      throw new Error(`Invalid value: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 'x': {
        return {
          [`${prefix}-right`]: value,
          [`${prefix}-left`]: value
        }
      }
      case 'y': {
        return {
          [`${prefix}-top`]: value,
          [`${prefix}-bottom`]: value
        }
      }
      case 't': {
        return {
          [`${prefix}-top`]: value
        }
      }
      case 'r': {
        return {
          [`${prefix}-right`]: value
        }
      }
      case 'b': {
        return {
          [`${prefix}-bottom`]: value
        }
      }
      case 'l': {
        return {
          [`${prefix}-left`]: value
        }
      }
    }
    return {
      padding: value
    }
  },
  regex: /^([mp])([xytrbl])?-(.+)$/
}

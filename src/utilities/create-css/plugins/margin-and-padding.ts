import { Plugin, ThemeKeys } from '../../../types'

export const marginAndPadding: Plugin = {
  createDeclarations: function ({
    matches,
    computeNumericValue
  }: {
    matches: RegExpMatchArray
    computeNumericValue: (
      value: string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
  }): { [property: string]: string } {
    const prefix = matches[1] === 'm' ? 'margin' : 'padding'
    const value = computeNumericValue(matches[3], [prefix, 'breakpoint'])
    if (value === null) {
      throw new Error(`Invalid ${prefix} value: ${matches[3]}`)
    }
    switch (matches[2]) {
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
  regex: /^([mp])([xytrbl])?(?:-(.+))?$/
}

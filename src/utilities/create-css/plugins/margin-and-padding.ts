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
    const property = matches[1] === 'm' ? 'margin' : 'padding'
    const value = computeNumericValue(matches[3], [property, 'breakpoint'])
    if (value === null) {
      throw new Error(`Invalid ${property} value: ${matches[3]}`)
    }
    switch (matches[2]) {
      case 'x': {
        return {
          [`${property}-right`]: value,
          [`${property}-left`]: value
        }
      }
      case 'y': {
        return {
          [`${property}-top`]: value,
          [`${property}-bottom`]: value
        }
      }
      case 't': {
        return {
          [`${property}-top`]: value
        }
      }
      case 'r': {
        return {
          [`${property}-right`]: value
        }
      }
      case 'b': {
        return {
          [`${property}-bottom`]: value
        }
      }
      case 'l': {
        return {
          [`${property}-left`]: value
        }
      }
    }
    return {
      [property]: value
    }
  },
  regex: /^([mp])([xytrbl])?(?:-(.+))?$/
}

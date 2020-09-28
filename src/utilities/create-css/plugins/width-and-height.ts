import { Plugin, ThemeKeys } from '../../../types'

export const widthAndHeight: Plugin = {
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
    const prefix = typeof matches[1] === 'undefined' ? '' : `${matches[1]}-`
    const suffix = matches[2] === 'w' ? 'width' : 'height'
    const value = computeNumericValue(matches[3], [suffix, 'breakpoint'])
    if (value === null) {
      throw new Error(`Invalid ${prefix} value: ${matches[3]}`)
    }
    return {
      [`${prefix}${suffix}`]: value
    }
  },
  regex: /^(max|min)?([wh])(?:-(.+))?$/
}

import { Plugin, ThemeKeys } from '../../../types'

export const borderWidth: Plugin = {
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
    const borderWidth = computeNumericValue(matches[2], ['borderWidth'])
    if (borderWidth === null) {
      throw new Error(`Invalid border width: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 'x': {
        return {
          'border-left-width': borderWidth,
          'border-right-width': borderWidth
        }
      }
      case 'y': {
        return {
          'border-bottom-width': borderWidth,
          'border-top-width': borderWidth
        }
      }
      case 't': {
        return {
          'border-top-width': borderWidth
        }
      }
      case 'r': {
        return {
          'border-right-width': borderWidth
        }
      }
      case 'b': {
        return {
          'border-bottom-width': borderWidth
        }
      }
      case 'l': {
        return {
          'border-left-width': borderWidth
        }
      }
    }
    return {
      'border-width': borderWidth
    }
  },
  regex: /^b([xytrbl])?-(.+)$/
}

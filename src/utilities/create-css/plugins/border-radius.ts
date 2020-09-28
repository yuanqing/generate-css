import { Plugin, ThemeKeys } from '../../../types'

export const borderRadius: Plugin = {
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
    const borderRadius =
      matches[2] === 'full'
        ? '9999px'
        : computeNumericValue(matches[2], ['borderRadius'])
    if (borderRadius === null) {
      throw new Error(`Invalid border radius: ${matches[2]}`)
    }
    switch (matches[1]) {
      case 't': {
        return {
          'border-top-left-radius': borderRadius,
          'border-top-right-radius': borderRadius
        }
      }
      case 'r': {
        return {
          'border-bottom-right-radius': borderRadius,
          'border-top-right-radius': borderRadius
        }
      }
      case 'b': {
        return {
          'border-bottom-left-radius': borderRadius,
          'border-bottom-right-radius': borderRadius
        }
      }
      case 'l': {
        return {
          'border-bottom-left-radius': borderRadius,
          'border-top-left-radius': borderRadius
        }
      }
      case 'tl': {
        return {
          'border-top-left-radius': borderRadius
        }
      }
      case 'tr': {
        return {
          'border-top-right-radius': borderRadius
        }
      }
      case 'bl': {
        return {
          'border-bottom-left-radius': borderRadius
        }
      }
      case 'br': {
        return {
          'border-bottom-right-radius': borderRadius
        }
      }
    }
    return {
      'border-radius': borderRadius
    }
  },
  regex: /^rounded(?:-([trbl]|[tb][lr]))?(?:-(.+))?$/
}

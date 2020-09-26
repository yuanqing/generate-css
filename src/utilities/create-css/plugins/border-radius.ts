import { Plugin } from '../../../types'

export const borderRadius: Plugin = {
  createDeclarations: function (
    matches: Array<string>
  ): { [property: string]: string } {
    const value = matches[1] === 'full' ? '9999px' : `${matches[1]}px`
    switch (matches[0]) {
      case 't': {
        return {
          'border-top-left-radius': value,
          'border-top-right-radius': value
        }
      }
      case 'r': {
        return {
          'border-bottom-right-radius': value,
          'border-top-right-radius': value
        }
      }
      case 'b': {
        return {
          'border-bottom-left-radius': value,
          'border-bottom-right-radius': value
        }
      }
      case 'l': {
        return {
          'border-bottom-left-radius': value,
          'border-top-left-radius': value
        }
      }
      case 'tl': {
        return {
          'border-top-left-radius': value
        }
      }
      case 'tr': {
        return {
          'border-top-right-radius': value
        }
      }
      case 'bl': {
        return {
          'border-bottom-left-radius': value
        }
      }
      case 'br': {
        return {
          'border-bottom-right-radius': value
        }
      }
    }
    return {
      'border-radius': value
    }
  },
  regex: /^rounded(?:-([trbl]|[tb][lr]))?(?:-(full|\d+))?$/
}
import { Plugin } from '../../../../types'

export const borderWidth: Plugin = {
  createDeclarations: function (
    matches: Array<string>
  ): { [property: string]: string } {
    const value = matches[1] === '0' ? matches[1] : `${matches[1]}px`
    switch (matches[0]) {
      case 'x': {
        return {
          'border-left-width': value,
          'border-right-width': value
        }
      }
      case 'y': {
        return {
          'border-bottom-width': value,
          'border-top-width': value
        }
      }
      case 't': {
        return {
          'border-top-width': value
        }
      }
      case 'r': {
        return {
          'border-right-width': value
        }
      }
      case 'b': {
        return {
          'border-bottom-width': value
        }
      }
      case 'l': {
        return {
          'border-left-width': value
        }
      }
    }
    return {
      'border-width': value
    }
  },
  regex: /^b([xytrbl])?-(\d)$/
}

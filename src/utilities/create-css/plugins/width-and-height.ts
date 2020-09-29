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
    const prefix = (typeof matches[1] === 'undefined' ? '' : matches[1]) as
      | ''
      | 'min'
      | 'max'
    const suffix = matches[2] === 'w' ? 'width' : 'height'
    const value = computeNumericValue(matches[3], [
      resolveProperty(prefix, suffix)
    ])
    const property = prefix === '' ? suffix : `${prefix}-${suffix}`
    if (value === null) {
      throw new Error(`Invalid ${property}: ${matches[3]}`)
    }
    return {
      [property]: value
    }
  },
  regex: /^(max|min)?([wh])(?:-(.+))?$/
}

function resolveProperty(
  prefix: '' | 'min' | 'max',
  suffix: 'width' | 'height'
): 'width' | 'minWidth' | 'maxHeight' | 'height' | 'minHeight' | 'maxWidth' {
  if (prefix === '') {
    return suffix
  }
  if (suffix === 'width') {
    return prefix === 'min' ? 'minWidth' : 'maxWidth'
  }
  return prefix === 'min' ? 'minHeight' : 'maxHeight'
}

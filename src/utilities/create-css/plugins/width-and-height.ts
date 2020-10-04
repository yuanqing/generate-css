/*
height

`.h` | `height: ${theme.height.default};`
`.h-screen` | `height: 100vh;`
`.h-${key}` | `height: ${theme.height[key] || computeNumericValue(key)};`
`.minh` | `min-height: ${theme.height.default};`
`.minh-screen` | `min-height: 100vh;`
`.minh-${key}` | `min-height: ${theme.height[key] || computeNumericValue(key)};`
`.maxh` | `max-height: ${theme.height.default};`
`.maxh-screen` | `max-height: 100vh;`
`.maxh-${key}` | `max-height: ${theme.height[key] || computeNumericValue(key)};`
---
width

`.w` | `width: ${theme.width.default};`
`.w-screen` | `width: 100vw;`
`.w-${key}` | `width: ${theme.width[key] || computeNumericValue(key)};`
`.minw` | `min-width: ${theme.width.default};`
`.minw-screen` | `min-width: 100vw;`
`.minw-${key}` | `min-width: ${theme.width[key] || computeNumericValue(key)};`
`.maxw` | `max-width: ${theme.width.default};`
`.maxw-screen` | `max-width: 100vw;`
`.maxw-${key}` | `max-width: ${theme.width[key] || computeNumericValue(key)};`
*/

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
    const property = prefix === '' ? suffix : `${prefix}-${suffix}`
    if (matches[3] === 'screen') {
      return {
        [property]: suffix === 'width' ? '100vw' : '100vh'
      }
    }
    const value = computeNumericValue(
      matches[3],
      resolveProperty(prefix, suffix)
    )
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
): Array<
  'width' | 'minWidth' | 'maxHeight' | 'height' | 'minHeight' | 'maxWidth'
> {
  if (prefix === '') {
    return [suffix]
  }
  if (suffix === 'width') {
    return [suffix, prefix === 'min' ? 'minWidth' : 'maxWidth']
  }
  return [suffix, prefix === 'min' ? 'minHeight' : 'maxHeight']
}

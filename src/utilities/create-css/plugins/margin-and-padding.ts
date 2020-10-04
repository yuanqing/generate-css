/*
margin

- `defaultValue` = `theme.margin.default` || `theme.space.default`
- `value` = `theme.margin[key]` || `theme.space[key]` || `resolveNumericValue(key)`

`.m` | `margin: ${defaultValue};`
`.mx` | `margin-left: ${defaultValue};`<br>`margin-right: ${defaultValue};`
`.my` | `margin-top: ${defaultValue};`<br>`margin-bottom: ${defaultValue};`
`.mt` | `margin-top: ${defaultValue};`
`.mr` | `margin-right: ${defaultValue};`
`.mb` | `margin-bottom: ${defaultValue};`
`.ml` | `margin-left: ${defaultValue};`
`.mx-${key}` | `margin-left: ${value};`<br>`margin-right: ${value};`
`.my-${key}` | `margin-top: ${value};`<br>`margin-bottom: ${value};`
`.mt-${key}` | `margin-top: ${value};`
`.mr-${key}` | `margin-right: ${value};`
`.mb-${key}` | `margin-bottom: ${value};`
`.ml-${key}` | `margin-left: ${value};`
---
padding

defaultValue = theme.padding.default || theme.space.default
value = theme.padding[key] || theme.space[key] || computeNumericValue(key)

`.p` | `padding: ${defaultValue};`
`.px` | `padding-left: ${defaultValue};`<br>`padding-right: ${defaultValue};`
`.py` | `padding-top: ${defaultValue};`<br>`padding-bottom: ${defaultValue};`
`.pt` | `padding-top: ${defaultValue};`
`.pr` | `padding-right: ${defaultValue};`
`.pb` | `padding-bottom: ${defaultValue};`
`.pl` | `padding-left: ${defaultValue};`
`.px-${key}` | `padding-left: ${value};`<br>`padding-right: ${value};`
`.py-${key}` | `padding-top: ${value};`<br>`padding-bottom: ${value};`
`.pt-${key}` | `padding-top: ${value};`
`.pr-${key}` | `padding-right: ${value};`
`.pb-${key}` | `padding-bottom: ${value};`
`.pl-${key}` | `padding-left: ${value};`
*/

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
    const value = computeNumericValue(matches[3], [property, 'space'])
    if (value === null) {
      throw new Error(`Invalid ${property}: ${matches[3]}`)
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

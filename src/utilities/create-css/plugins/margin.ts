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
`.-m` | `margin: -${defaultValue};`
`.-mx` | `margin-left: -${defaultValue};`<br>`margin-right: -${defaultValue};`
`.-my` | `margin-top: -${defaultValue};`<br>`margin-bottom: -${defaultValue};`
`.-mt` | `margin-top: -${defaultValue};`
`.-mr` | `margin-right: -${defaultValue};`
`.-mb` | `margin-bottom: -${defaultValue};`
`.-ml` | `margin-left: -${defaultValue};`
`.-mx-${key}` | `margin-left: -${value};`<br>`margin-right: -${value};`
`.-my-${key}` | `margin-top: -${value};`<br>`margin-bottom: -${value};`
`.-mt-${key}` | `margin-top: -${value};`
`.-mr-${key}` | `margin-right: -${value};`
`.-mb-${key}` | `margin-bottom: -${value};`
`.-ml-${key}` | `margin-left: -${value};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const margin: Plugin = {
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
    const value = computeNumericValue(
      `${matches[1] === '-' ? '-' : ''}${
        typeof matches[3] === 'undefined' ? 'default' : matches[3]
      }`,
      ['margin', 'space']
    )
    if (value === null) {
      throw new Error(
        `Invalid ${matches[1] === '-' ? 'negative ' : ''}margin: ${matches[3]}`
      )
    }
    switch (matches[2]) {
      case 'x': {
        return {
          'margin-left': value,
          'margin-right': value
        }
      }
      case 'y': {
        return {
          'margin-bottom': value,
          'margin-top': value
        }
      }
      case 't': {
        return {
          'margin-top': value
        }
      }
      case 'r': {
        return {
          'margin-right': value
        }
      }
      case 'b': {
        return {
          'margin-bottom': value
        }
      }
      case 'l': {
        return {
          'margin-left': value
        }
      }
    }
    return {
      margin: value
    }
  },
  regex: /^(-?)m([xytrbl])?(?:-(.+))?$/
}

/*
top, right, bottom, left

- `value` = `theme.space[key]` || `resolveNumericValue(key)`

`.top` | `top: 0;`
`.top-${key}` | `top: ${value};`
`.-top-${key}` | `top: -${value};`
`.right` | `right: 0;`
`.right-${key}` | `right: ${value};`
`.-right-${key}` | `right: -${value};`
`.bottom` | `bottom: 0;`
`.bottom-${key}` | `bottom: ${value};`
`.-bottom-${key}` | `bottom: -${value};`
`.left` | `left: 0;`
`.left-${key}` | `left: ${value};`
`.-left-${key}` | `left: -${value};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const position: Plugin = {
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
    const property = matches[2]
    const value = computeNumericValue(
      `${matches[1] === '-' ? '-' : ''}${
        typeof matches[3] === 'undefined' ? '0' : matches[3]
      }`,
      ['space']
    )
    if (value === null) {
      throw new Error(
        `Invalid ${
          matches[1] === '-' ? 'negative ' : ''
        }${property} position: ${matches[3]}`
      )
    }
    return {
      [property]: value
    }
  },
  regex: /^(-?)(top|right|bottom|left)?(?:-(.+))?$/
}

/*
line-height

`.leading` | `line-height: ${theme.lineHeight.default};`
`.leading-${key}` | `line-height: ${theme.lineHeight[key]};`
*/

import { Plugin, ThemeKeys } from '../../../types'

export const lineHeight: Plugin = {
  createDeclarations: function ({
    computeNumericValue,
    matches
  }: {
    computeNumericValue: (
      value: string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
    matches: RegExpMatchArray
  }): { [property: string]: string } {
    const lineHeight = computeNumericValue(matches[1], ['lineHeight'])
    if (lineHeight === null) {
      throw new Error(`Invalid line-height: ${matches[1]}`)
    }
    return {
      'line-height': `${lineHeight}`
    }
  },
  regex: /^(?:leading|line-height)(?:-(.+))?$/
}

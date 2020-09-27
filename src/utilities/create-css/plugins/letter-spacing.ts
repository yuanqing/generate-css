import { Plugin, ThemeKeys } from '../../../types'

export const letterSpacing: Plugin = {
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
    const letterSpacing = computeNumericValue(matches[1], ['letterSpacing'])
    if (letterSpacing === null) {
      throw new Error(`Invalid letter-spacing: ${matches[1]}`)
    }
    return {
      'letter-spacing': `${letterSpacing}`
    }
  },
  regex: /^(?:kerning|letter-spacing|tracking)-(.+)$/
}

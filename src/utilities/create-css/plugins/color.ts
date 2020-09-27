import { Plugin, ThemeKeys } from '../../../types'

export const color: Plugin = {
  createDeclarations: function ({
    matches,
    computeColorValue
  }: {
    matches: RegExpMatchArray
    computeColorValue: (
      value: string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
  }): { [property: string]: string } {
    const color = computeColorValue(matches[1], ['color'])
    if (color === null) {
      throw new Error(`Invalid color: ${matches[1]}`)
    }
    return {
      color: `${color}`
    }
  },
  regex: /^color-(.+)$/
}

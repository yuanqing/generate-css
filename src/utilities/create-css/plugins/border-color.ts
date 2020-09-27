import { Plugin, ThemeKeys } from '../../../types'

export const borderColor: Plugin = {
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
    const borderColor = computeColorValue(matches[1], ['borderColor', 'color'])
    if (borderColor === null) {
      throw new Error(`Invalid border color: ${matches[1]}`)
    }
    return {
      'border-color': `${borderColor}`
    }
  },
  regex: /^border-(.+)$/
}

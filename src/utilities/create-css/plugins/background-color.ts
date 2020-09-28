import { Plugin, ThemeKeys } from '../../../types'

export const backgroundColor: Plugin = {
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
    const backgroundColor = computeColorValue(matches[1], [
      'backgroundColor',
      'color'
    ])
    if (backgroundColor === null) {
      throw new Error(`Invalid background color: ${matches[1]}`)
    }
    return {
      'background-color': `${backgroundColor}`
    }
  },
  regex: /^bg(?:-(.+))?$/
}

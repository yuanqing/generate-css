import { Plugin, Theme } from '../../../types'

export const color: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    const color = theme.color[matches[1]]
    if (typeof color === 'undefined') {
      throw new Error(`Invalid color: ${matches[1]}`)
    }
    return {
      color: `${color}`
    }
  },
  regex: /^color-(.+)$/
}

import { Plugin, Theme } from '../../../types'

export const backgroundColor: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    if (typeof theme.color === 'undefined') {
      throw new Error('`theme.color` not defined in configuration')
    }
    const color = theme.color[matches[1]]
    if (typeof color === 'undefined') {
      throw new Error(`Invalid background color: ${matches[1]}`)
    }
    return {
      'background-color': `${color}`
    }
  },
  regex: /^bg-(.+)$/
}

import { Plugin, Theme } from '../../../types'

export const borderColor: Plugin = {
  createDeclarations: function ({
    matches,
    theme
  }: {
    matches: RegExpMatchArray
    theme: Theme
  }): { [property: string]: string } {
    const borderColor = theme.color[matches[1]]
    if (typeof borderColor === 'undefined') {
      throw new Error(`Invalid border color: ${matches[1]}`)
    }
    return {
      'border-color': `${borderColor}`
    }
  },
  regex: /^border-(.+)$/
}

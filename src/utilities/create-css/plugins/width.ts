import { Config, Plugin } from '../../../types'

export const width: Plugin = {
  createDeclarations: function (
    config: Config,
    matches: Array<string>,
    className: string
  ): { [property: string]: string } {
    if (matches[0] === 'full') {
      return {
        width: '100%'
      }
    }
    const width = parseInt(matches[0], 10)
    if (isNaN(width) === true) {
      throw new Error(`Invalid class: ${className}`)
    }
    return {
      width: `${parseInt(matches[0], 10) * config.space.value}${
        config.space.unit
      }`
    }
  },
  regex: /w-(.+)/
}

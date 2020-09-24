import { Config, CssDeclarationBlock } from '../../types'

export function createBaseCss(config: Config): Array<CssDeclarationBlock> {
  const result: Array<CssDeclarationBlock> = []
  if (typeof config.baseFontSize === 'undefined') {
    return result
  }
  for (const key of Object.keys(config.baseFontSize)) {
    result.push({
      breakpoint: key === 'default' ? null : key,
      declarations: {
        'font-size': config.baseFontSize[key]
      },
      isClass: false,
      pseudoClass: null,
      selector: 'html'
    })
  }
  return result
}

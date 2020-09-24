import { Config, CssDeclarationBlock } from '../../../types'
import { formatValueFactory } from './format-value-factory'
import { mapSelectorToDeclaration } from './map-selector-to-declaration'
import { parseClassName } from './parse-class-name'
import { plugins } from './plugins'

export function createClassesCss(
  classNames: Array<string>,
  config: Config
): Array<CssDeclarationBlock> {
  const formatValue = formatValueFactory(config.breakpoint, config.space)
  const result: Array<CssDeclarationBlock> = []
  for (const className of classNames) {
    const cssDeclarationBlock = createCssDeclarationBlock(
      className,
      config,
      formatValue
    )
    if (cssDeclarationBlock === null) {
      continue
    }
    result.push(cssDeclarationBlock)
  }
  return result
}

function createCssDeclarationBlock(
  className: string,
  config: Config,
  formatValue: (value: string) => null | string
): null | CssDeclarationBlock {
  const { breakpoint, pseudoClass, selector } = parseClassName(
    className,
    config
  )
  const declarations = mapSelectorToDeclaration(selector)
  if (declarations !== null) {
    return {
      breakpoint,
      declarations,
      isClass: true,
      pseudoClass,
      selector
    }
  }
  let matches
  for (const plugin of plugins) {
    matches = selector.match(plugin.regex)
    if (matches !== null) {
      return {
        breakpoint,
        declarations: plugin.createDeclarations(
          matches.slice(1),
          config,
          formatValue
        ),
        isClass: true,
        pseudoClass,
        selector
      }
    }
  }
  return null
}

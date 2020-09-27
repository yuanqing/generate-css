import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../../types'
import { formatValueFactory } from './format-value-factory'
import { groupCssDeclarationBlocksByBreakpoint } from './group-css-declaration-blocks-by-breakpoint'
import { mapSelectorToDeclaration } from './map-selector-to-declaration'
import { parseClassName } from './parse-class-name'
import { plugins } from './plugins'

export function createCss(
  classNames: Array<string>,
  config: Config
): Array<CssDeclarationBlocks> {
  const formatValue = formatValueFactory(
    config.theme.breakpoint,
    config.theme.space
  )
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
  return groupCssDeclarationBlocksByBreakpoint(result)
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
      className,
      declarations,
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
        className,
        declarations: plugin.createDeclarations(
          matches.slice(1),
          config,
          formatValue
        ),
        pseudoClass,
        selector
      }
    }
  }
  return null
}

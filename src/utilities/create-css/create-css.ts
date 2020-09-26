import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../../types'
import { formatValueFactory } from './create-classes-css/format-value-factory'
import { mapSelectorToDeclaration } from './create-classes-css/map-selector-to-declaration'
import { parseClassName } from './create-classes-css/parse-class-name'
import { plugins } from './create-classes-css/plugins'
import { groupCssDeclarationBlocksByBreakpoint } from './group-css-declaration-blocks-by-breakpoint'

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

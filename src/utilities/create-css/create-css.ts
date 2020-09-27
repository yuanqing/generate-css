import { CssDeclarationBlock, CssDeclarationBlocks, Theme } from '../../types'
import { formatValueFactory } from './format-value-factory'
import { groupCssDeclarationBlocksByBreakpoint } from './group-css-declaration-blocks-by-breakpoint'
import { mapSelectorToDeclaration } from './map-selector-to-declaration'
import { parseClassName } from './parse-class-name'
import { plugins } from './plugins'

export function createCss(
  classNames: Array<string>,
  theme: Theme
): Array<CssDeclarationBlocks> {
  const formatValue = formatValueFactory(theme.breakpoint, theme.space)
  const result: Array<CssDeclarationBlock> = []
  for (const className of classNames) {
    const cssDeclarationBlock = createCssDeclarationBlock(
      className,
      theme,
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
  theme: Theme,
  formatValue: (value: string) => null | string
): null | CssDeclarationBlock {
  const { breakpoint, pseudoClass, selector } = parseClassName(
    className,
    typeof theme.breakpoint === 'undefined' ? [] : Object.keys(theme.breakpoint)
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
        declarations: plugin.createDeclarations({
          formatValue,
          matches,
          theme
        }),
        pseudoClass,
        selector
      }
    }
  }
  return null
}

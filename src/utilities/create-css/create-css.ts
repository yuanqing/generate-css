import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../../types'
import { formatValueFactory } from './format-value-factory'
import { mapSelectorToDeclaration } from './map-selector-to-declaration'
import { parseClassName } from './parse-class-name'
import { plugins } from './plugins'

export function createCss(
  classNames: Array<string>,
  config: Config
): Array<CssDeclarationBlocks> {
  const result: Array<CssDeclarationBlock> = []
  const formatValue = formatValueFactory(config.breakpoint, config.space)
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
  const { breakpoint, pseudoClass, selector } = parseClassName(className)
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

function groupCssDeclarationBlocksByBreakpoint(
  cssDeclarationBlocks: Array<CssDeclarationBlock>
): Array<CssDeclarationBlocks> {
  const base = []
  const breakpoints: { [breakpoint: string]: Array<CssDeclarationBlock> } = {}
  for (const cssDeclarationBlock of cssDeclarationBlocks) {
    const breakpoint = cssDeclarationBlock.breakpoint
    if (breakpoint === null) {
      base.push(cssDeclarationBlock)
      continue
    }
    if (typeof breakpoints[breakpoint] === 'undefined') {
      breakpoints[breakpoint] = []
    }
    breakpoints[breakpoint].push(cssDeclarationBlock)
  }
  const result: Array<CssDeclarationBlocks> = []
  result.push({
    breakpoint: null,
    cssDeclarationBlocks: base
  })
  for (const breakpoint of Object.keys(breakpoints)) {
    result.push({
      breakpoint,
      cssDeclarationBlocks: sortCssDeclarationBlocks(breakpoints[breakpoint])
    })
  }
  return result
}

function sortCssDeclarationBlocks(
  cssDeclarationBlocks: Array<CssDeclarationBlock>
) {
  return cssDeclarationBlocks.slice().sort(function (a, b) {
    if (a.pseudoClass === null) {
      return b.pseudoClass === null ? a.selector.localeCompare(b.selector) : -1
    }
    return b.pseudoClass === null ? 1 : a.selector.localeCompare(b.selector)
  })
}

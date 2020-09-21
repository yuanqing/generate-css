import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../../types'
import { parseClassName } from './parse-class-name'
import { width } from './plugins/width'

const plugins = [width]

export function createCss(
  classNames: Array<string>,
  config: Config
): Array<CssDeclarationBlocks> {
  const result: Array<CssDeclarationBlock> = []
  for (const className of classNames) {
    result.push(createCssDeclarationBlock(className, config))
  }
  return groupCssDeclarationBlocksByBreakpoint(result)
}

function createCssDeclarationBlock(
  className: string,
  config: Config
): CssDeclarationBlock {
  const { breakpoint, pseudoClass, selector } = parseClassName(className)
  let matches
  for (const plugin of plugins) {
    matches = selector.match(plugin.regex)
    if (matches === null) {
      continue
    }
    return {
      breakpoint,
      declarations: plugin.createDeclarations(
        config,
        matches.slice(1),
        className
      ),
      pseudoClass,
      selector
    }
  }
  throw new Error(`Classname ${className} not match any plugin`)
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

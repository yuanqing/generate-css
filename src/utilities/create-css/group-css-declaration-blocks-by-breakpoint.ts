import { CssDeclarationBlock, CssDeclarationBlocks } from '../../types'

export function groupCssDeclarationBlocksByBreakpoint(
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
    cssDeclarationBlocks: sortCssDeclarationBlocks(base)
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

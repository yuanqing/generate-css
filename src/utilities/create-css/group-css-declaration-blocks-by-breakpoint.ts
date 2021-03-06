import {
  CssDeclarationBlock,
  CssDeclarationBlocks,
  ThemeItem
} from '../../types'

export function groupCssDeclarationBlocksByBreakpoint(
  cssDeclarationBlocks: Array<CssDeclarationBlock>,
  themeBreakpoints?: ThemeItem
): Array<CssDeclarationBlocks> {
  if (cssDeclarationBlocks.length === 0) {
    return []
  }
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
      cssDeclarationBlocks: breakpoints[breakpoint]
    })
  }
  return sortCss(result, themeBreakpoints)
}

function sortCss(
  css: Array<CssDeclarationBlocks>,
  themeBreakpoints?: ThemeItem
) {
  return css
    .slice()
    .sort(function (a, b) {
      if (a.breakpoint === null) {
        return -1
      }
      if (b.breakpoint === null) {
        return 1
      }
      if (typeof themeBreakpoints !== 'undefined') {
        const aBreakpointWidth = themeBreakpoints[a.breakpoint]
        const bBreakpointWidth = themeBreakpoints[b.breakpoint]
        if (
          typeof aBreakpointWidth !== 'undefined' &&
          typeof bBreakpointWidth !== 'undefined'
        ) {
          return parseInt(aBreakpointWidth, 10) - parseInt(bBreakpointWidth, 10)
        }
      }
      return a.breakpoint.localeCompare(b.breakpoint)
    })
    .map(function ({ breakpoint, cssDeclarationBlocks }: CssDeclarationBlocks) {
      return {
        breakpoint,
        cssDeclarationBlocks: cssDeclarationBlocks
          .slice()
          .sort(function (x, y): number {
            if (x.selector !== y.selector) {
              return x.selector.localeCompare(y.selector)
            }
            if (x.pseudoClass === null) {
              return -1
            }
            if (y.pseudoClass === null) {
              return 1
            }
            return x.pseudoClass.value.localeCompare(y.pseudoClass.value)
          })
      }
    })
}

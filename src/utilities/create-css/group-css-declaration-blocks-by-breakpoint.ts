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
    cssDeclarationBlocks: base
  })
  for (const breakpoint of Object.keys(breakpoints)) {
    result.push({
      breakpoint,
      cssDeclarationBlocks: breakpoints[breakpoint]
    })
  }
  return result
}

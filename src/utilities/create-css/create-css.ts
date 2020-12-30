import { CssDeclarationBlock, CssDeclarationBlocks, Theme } from '../../types'
import { createCssDeclarationBlock } from './create-css-declaration-block'
import { groupCssDeclarationBlocksByBreakpoint } from './group-css-declaration-blocks-by-breakpoint'

export function createCss(
  classNames: Array<string>,
  theme: Theme
): Array<CssDeclarationBlocks> {
  const result: Array<CssDeclarationBlock> = []
  for (const className of classNames) {
    const cssDeclarationBlock = createCssDeclarationBlock(className, theme)
    if (cssDeclarationBlock === null) {
      continue
    }
    result.push(cssDeclarationBlock)
  }
  return groupCssDeclarationBlocksByBreakpoint(result, theme.breakpoint)
}

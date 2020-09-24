import { Config, CssDeclarationBlocks } from '../../types'
import { createBaseCss } from './create-base-css'
import { createClassesCss } from './create-classes-css/create-classes-css'
import { groupCssDeclarationBlocksByBreakpoint } from './group-css-declaration-blocks-by-breakpoint'

export function createCss(
  classNames: Array<string>,
  config: Config
): Array<CssDeclarationBlocks> {
  return groupCssDeclarationBlocksByBreakpoint([
    ...createBaseCss(config),
    ...createClassesCss(classNames, config)
  ])
}

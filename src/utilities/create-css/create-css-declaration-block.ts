import { CssDeclarationBlock, Theme } from '../../types'
import { computeColorValueFactory } from './compute-color-value-factory'
import { computeNumericValueFactory } from './compute-numeric-value-factory'
import { mapSelectorToDeclaration } from './map-selector-to-declaration'
import { parseClassName } from './parse-class-name'
import { plugins } from './plugins'

export function createCssDeclarationBlock(
  className: string,
  theme: Theme
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
  const computeNumericValue = computeNumericValueFactory(theme)
  const computeColorValue = computeColorValueFactory(theme)
  let matches
  for (const plugin of plugins) {
    matches = selector.match(plugin.regex)
    if (matches !== null) {
      return {
        breakpoint,
        className,
        declarations: plugin.createDeclarations({
          computeColorValue,
          computeNumericValue,
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

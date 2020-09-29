import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../types'

export function stringifyCss(
  css: Array<CssDeclarationBlocks>,
  config: Config
): string {
  const result = []
  for (const { breakpoint, cssDeclarationBlocks } of css) {
    if (breakpoint !== null) {
      if (typeof config.theme.breakpoint === 'undefined') {
        throw new Error('`theme.breakpoint` not defined in configuration')
      }
      if (typeof config.theme.breakpoint[breakpoint] === 'undefined') {
        throw new Error(
          `Breakpoint not defined in \`theme.breakpoint\`: ${breakpoint}`
        )
      }
      result.push(
        `@media (min-width: ${config.theme.breakpoint[breakpoint]}) {`
      )
    }
    result.push(stringifyCssDeclarationBlocks(cssDeclarationBlocks))
    if (breakpoint !== null) {
      result.push('}')
    }
  }
  return result.join('')
}

function stringifyCssDeclarationBlocks(
  cssDeclarationBlocks: Array<CssDeclarationBlock>
): string {
  const result = []
  for (const { className, declarations, pseudoClass } of cssDeclarationBlocks) {
    if (pseudoClass !== null && pseudoClass.isGroup === true) {
      result.push(`.group${stringifyPseudoClass(pseudoClass.value)} `)
    }
    result.push('.')
    result.push(escapeSpecialCharacters(className))
    if (pseudoClass !== null && pseudoClass.isGroup === false) {
      result.push(stringifyPseudoClass(pseudoClass.value))
    }
    result.push(`{${stringifyDeclarations(declarations)}}`)
  }
  return result.join('')
}

const specialCharactersRegex = /[/:@%]/g

function escapeSpecialCharacters(string: string) {
  return string.replace(specialCharactersRegex, function (match: string) {
    return `\\${match}`
  })
}

function stringifyPseudoClass(pseudoClass: string): string {
  if (pseudoClass === 'selection') {
    return ` ::${pseudoClass}`
  }
  if (pseudoClass === 'placeholder') {
    return `::${pseudoClass}`
  }
  return `:${pseudoClass}`
}

function stringifyDeclarations(declarations: { [property: string]: string }) {
  const result = []
  for (const property of Object.keys(declarations)) {
    result.push(`${property}:${declarations[property]}`)
  }
  return result.join(';')
}

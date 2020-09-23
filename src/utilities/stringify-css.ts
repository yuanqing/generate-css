import { Config, CssDeclarationBlock, CssDeclarationBlocks } from '../types'

export function stringifyCss(
  css: Array<CssDeclarationBlocks>,
  config: Config
): string {
  const result = []
  for (const { breakpoint, cssDeclarationBlocks } of css) {
    if (breakpoint !== null) {
      if (typeof config.breakpoint[breakpoint] === 'undefined') {
        throw new Error(
          `Breakpoint not defined in configuration file: ${breakpoint}`
        )
      }
      result.push(`@media (min-width: ${config.breakpoint[breakpoint]}){`)
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
  for (const {
    breakpoint,
    pseudoClass,
    selector,
    declarations: declarations
  } of cssDeclarationBlocks) {
    result.push('.')
    if (breakpoint !== null) {
      result.push(`${breakpoint}\\:`)
    }
    if (pseudoClass !== null) {
      result.push(`${pseudoClass}\\:`)
    }
    result.push(escapeSpecialCharacters(selector))
    if (pseudoClass !== null) {
      result.push(`:${pseudoClass}`)
    }
    result.push(`{${stringifyDeclarations(declarations)}}`)
  }
  return result.join('')
}

const specialCharactersRegex = /[/:]/

function escapeSpecialCharacters(string: string) {
  return string.replace(specialCharactersRegex, function (match: string) {
    return `\\${match}`
  })
}

function stringifyDeclarations(declarations: { [property: string]: string }) {
  const result = []
  for (const property of Object.keys(declarations)) {
    result.push(`${property}:${declarations[property]}`)
  }
  return result.join(';')
}

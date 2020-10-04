import { ParsedClassName } from '../../types'

const classRegex = /^(?:([^@]+)@)?([^:]+)(?::(.+))?$/

export function parseClassName(
  className: string,
  breakpoints: Array<string>
): ParsedClassName {
  const matches = className.match(classRegex)
  if (matches === null) {
    throw new Error(`Invalid class name: ${className}`)
  }
  const breakpoint = typeof matches[1] === 'undefined' ? null : matches[1]
  if (breakpoint !== null && breakpoints.indexOf(breakpoint) === -1) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`)
  }
  if (typeof matches[3] === 'undefined') {
    return {
      breakpoint,
      pseudoClass: null,
      selector: matches[2]
    }
  }
  return {
    breakpoint,
    pseudoClass: parsePseudoClass(matches[2]),
    selector: matches[3]
  }
}

const groupPseudoClassRegex = /^group-(.+)$/

function parsePseudoClass(
  pseudoClass: string
): {
  value: string
  isParent: boolean
} {
  const matches = pseudoClass.match(groupPseudoClassRegex)
  if (matches === null) {
    return {
      isParent: false,
      value: pseudoClass
    }
  }
  return {
    isParent: true,
    value: matches[1]
  }
}

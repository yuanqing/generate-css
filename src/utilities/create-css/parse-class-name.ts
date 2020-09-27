import { ParsedClassName } from '../../types'

const classRegex = /^(?:([^@]+)@)?([^:]+)(?::(.+))?$/

export function parseClassName(
  className: string,
  breakpoints: Array<string>
): ParsedClassName {
  if (className === '') {
    throw new Error('Class name is an empty string')
  }
  const matches = className.match(classRegex)
  if (matches === null) {
    return {
      breakpoint: null,
      pseudoClass: null,
      selector: className
    }
  }
  const breakpoint = typeof matches[1] === 'undefined' ? null : matches[1]
  if (breakpoint !== null && breakpoints.indexOf(breakpoint) === -1) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`)
  }
  return {
    breakpoint,
    pseudoClass:
      typeof matches[3] === 'undefined' ? null : parsePseudoClass(matches[3]),
    selector: matches[2]
  }
}

const groupPseudoClassRegex = /^group-(.+)$/

function parsePseudoClass(
  pseudoClass: string
): {
  value: string
  isGroup: boolean
} {
  const matches = pseudoClass.match(groupPseudoClassRegex)
  if (matches === null) {
    return {
      isGroup: false,
      value: pseudoClass
    }
  }
  return {
    isGroup: true,
    value: matches[1]
  }
}

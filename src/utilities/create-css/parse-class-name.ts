import { ParsedClassName } from '../../types'

const classRegex = /^(?:([^@]+)@)?([^:]+)(?::(.+))?$/

export function parseClassName(
  className: string,
  breakpoints: Array<string>
): ParsedClassName {
  const matches = className.match(classRegex)
  if (matches === null) {
    return {
      breakpoint: null,
      pseudoClass: null,
      selector: className
    }
  }
  const breakpoint =
    typeof matches[1] === 'undefined' || breakpoints.indexOf(matches[1]) === -1
      ? null
      : matches[1]
  return {
    breakpoint: breakpoint,
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

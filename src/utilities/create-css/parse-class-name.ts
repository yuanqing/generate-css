import { ParsedClassName } from '../../types'

const classRegex = /(?:([^:]+):)?(?:([^:]+):)?(.+)/

export function parseClassName(className: string): ParsedClassName {
  const matches = className.match(classRegex)
  if (matches === null) {
    return {
      breakpoint: null,
      pseudoClass: null,
      selector: className
    }
  }
  return {
    breakpoint: typeof matches[1] === 'undefined' ? null : matches[1],
    pseudoClass: typeof matches[2] === 'undefined' ? null : matches[2],
    selector: matches[3]
  }
}

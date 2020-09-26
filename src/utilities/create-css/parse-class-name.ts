import { Config, ParsedClassName } from '../../types'

const classRegex = /(?:([^:]+):)?(?:([^:]+):)?(.+)/

export function parseClassName(
  className: string,
  config: Config
): ParsedClassName {
  const matches = className.match(classRegex)
  if (matches === null || typeof matches[1] === 'undefined') {
    return {
      breakpoint: null,
      pseudoClass: null,
      selector: className
    }
  }
  if (typeof matches[2] === 'undefined') {
    if (typeof config.theme.breakpoint[matches[1]] === 'undefined') {
      return {
        breakpoint: null,
        pseudoClass: matches[1],
        selector: matches[3]
      }
    }
    return {
      breakpoint: matches[1],
      pseudoClass: null,
      selector: matches[3]
    }
  }
  return {
    breakpoint: matches[1],
    pseudoClass: matches[2],
    selector: matches[3]
  }
}

import { Theme, ThemeItem, ThemeKeys } from '../../types'

const pixelValueRegex = /^\d+px$/
const fractionRegex = /^(\d+)\/(\d+)$/
const integerRegex = /^\d+$/

export function computeNumericValueFactory(
  theme: Theme
): (value: string, themeKeys: Array<ThemeKeys>) => null | string {
  const parsedSpace = parseSpace(theme.space)
  return function (value: string, themeKeys: Array<ThemeKeys>): null | string {
    for (const themeKey of themeKeys) {
      if (
        typeof themeKey !== 'undefined' &&
        typeof theme[themeKey] !== 'undefined'
      ) {
        const result = (theme[themeKey] as ThemeItem)[value]
        if (typeof result !== 'undefined') {
          return result
        }
      }
    }
    switch (value) {
      case 'auto': {
        return 'auto'
      }
      case 'full': {
        return '100%'
      }
      case 'px': {
        return '1px'
      }
    }
    let matches
    matches = value.match(pixelValueRegex)
    if (matches !== null) {
      return matches[0]
    }
    matches = value.match(fractionRegex)
    if (matches !== null) {
      return `${formatNumber(
        (parseFloat(matches[1]) / parseFloat(matches[2])) * 100
      )}%`
    }
    matches = value.match(integerRegex)
    if (matches !== null) {
      if (matches[0] === '0') {
        return '0'
      }
      if (parsedSpace === null) {
        throw new Error('`theme.space` not defined in configuration')
      }
      return `${parseFloat(matches[0]) * parsedSpace.value}${parsedSpace.unit}`
    }
    return null
  }
}

const valueAndUnitRegex = /((?:\d*\.)?\d+) ?([A-Za-z]+)/

function parseSpace(space?: string): null | { value: number; unit: string } {
  if (typeof space === 'undefined') {
    return null
  }
  const matches = space.match(valueAndUnitRegex)
  if (matches === null) {
    throw new Error(`Invalid space: ${space}`)
  }
  return {
    unit: matches[2],
    value: parseFloat(matches[1])
  }
}

const zeroesSuffixRegex = /0+$/
const dotSuffixRegex = /\.$/

function formatNumber(number: number): string {
  return number
    .toFixed(6)
    .replace(zeroesSuffixRegex, '')
    .replace(dotSuffixRegex, '')
}

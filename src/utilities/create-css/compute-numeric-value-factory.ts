import { Theme, ThemeItem, ThemeKeys } from '../../types'

const minusPrefixRegex = /^(-?)(.+)$/
const pixelValueRegex = /^\d+px$/
const fractionRegex = /^(\d+)\/(\d+)$/
const integerRegex = /^\d+$/

export function computeNumericValueFactory(
  theme: Theme
): (value: undefined | string, themeKeys: Array<ThemeKeys>) => null | string {
  const parsedSpace = parseSpace(theme.baseSpace)
  return function (
    value = 'default',
    themeKeys: Array<ThemeKeys>
  ): null | string {
    let matches
    matches = value.match(minusPrefixRegex) as RegExpMatchArray
    const prefix = matches[1] === '-' ? '-' : ''
    const parsedValue = matches[2]
    for (const themeKey of themeKeys) {
      if (
        typeof themeKey !== 'undefined' &&
        typeof theme[themeKey] !== 'undefined'
      ) {
        const result = (theme[themeKey] as ThemeItem)[parsedValue]
        if (typeof result !== 'undefined') {
          return `${prefix}${result}`
        }
      }
    }
    switch (parsedValue) {
      case 'auto': {
        return 'auto'
      }
      case 'full': {
        return `${prefix}100%`
      }
      case 'px': {
        return `${prefix}1px`
      }
    }
    matches = parsedValue.match(pixelValueRegex)
    if (matches !== null) {
      if (matches[0] === '0px') {
        return '0'
      }
      return `${prefix}${matches[0]}`
    }
    matches = parsedValue.match(fractionRegex)
    if (matches !== null) {
      return `${prefix}${formatNumber(
        (parseFloat(matches[1]) / parseFloat(matches[2])) * 100
      )}%`
    }
    matches = parsedValue.match(integerRegex)
    if (matches !== null) {
      if (matches[0] === '0') {
        return '0'
      }
      if (parsedSpace === null) {
        throw new Error('`theme.space` not defined in configuration')
      }
      return `${prefix}${parseFloat(matches[0]) * parsedSpace.value}${
        parsedSpace.unit
      }`
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

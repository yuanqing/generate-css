const pixelValueRegex = /^\d+px$/
const fractionRegex = /^(\d+)\/(\d+)$/
const integerRegex = /^\d+$/

export function formatValueFactory(
  breakpoints: { [name: string]: string },
  space: number | string
): (value: string) => null | string {
  const parsedSpace = parseSpace(space)
  return function (value: string): null | string {
    if (typeof breakpoints[value] !== 'undefined') {
      return breakpoints[value]
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
      return matches[0] === '0px' ? '0' : matches[0]
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
      return `${parseFloat(matches[0]) * parsedSpace.value}${parsedSpace.unit}`
    }
    return null
  }
}

const valueAndUnitRegex = /((?:\d*\.)?\d+) ?([A-Za-z]+)/

function parseSpace(space: number | string): { value: number; unit: string } {
  if (typeof space === 'number') {
    return {
      unit: 'px',
      value: space
    }
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

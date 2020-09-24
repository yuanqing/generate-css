const valueRegex = /^(\d+px)|((\d+)\/(\d+))|(\d+)$/

export function formatValueFactory(
  breakpoints: { [breakpoint: string]: string },
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
    const matches = value.match(valueRegex)
    if (matches === null) {
      return null
    }
    if (typeof matches[1] !== 'undefined') {
      return matches[1] === '0px' ? '0' : matches[1]
    }
    if (typeof matches[2] !== 'undefined') {
      return `${formatNumber(
        (parseFloat(matches[3]) / parseFloat(matches[4])) * 100
      )}%`
    }
    if (typeof matches[5] !== 'undefined') {
      if (matches[5] === '0') {
        return '0'
      }
      return `${parseFloat(matches[5]) * parsedSpace.value}${parsedSpace.unit}`
    }
    return null
  }
}

const valueAndUnitRegex = /([\d.]+)([A-Za-z]+)?/

function parseSpace(space: number | string): { value: number; unit: string } {
  if (typeof space === 'number') {
    return {
      unit: '',
      value: space
    }
  }
  const matches = space.match(valueAndUnitRegex)
  if (matches === null) {
    throw new Error(`Invalid space: ${space}`)
  }
  const unit = matches[2]
  return {
    unit: typeof unit === 'undefined' ? '' : unit,
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

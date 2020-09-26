import { Config } from '../types'

export function createBaseFontSizeCss(config: Config): string {
  if (typeof config.baseFontSize === 'undefined') {
    return ''
  }
  const result: Array<string> = []
  for (const key of Object.keys(config.baseFontSize)) {
    const fontSize = config.baseFontSize[key]
    if (key === 'default') {
      result.push(createHtmlFontSizeCss(fontSize))
      continue
    }
    const breakpoint = config.breakpoint[key]
    if (typeof breakpoint === 'undefined') {
      throw new Error(`Breakpoint ${key} not defined in configuration`)
    }
    result.push(
      `@media (min-width: ${breakpoint}) { ${createHtmlFontSizeCss(fontSize)} }`
    )
  }
  return result.join('')
}

function createHtmlFontSizeCss(fontSize: string): string {
  return `html { font-size: ${fontSize}; }`
}

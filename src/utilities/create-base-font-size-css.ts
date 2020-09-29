import { Config } from '../types'

export function createBaseFontSizeCss(config: Config): string {
  if (typeof config.theme.baseFontSize === 'undefined') {
    return ''
  }
  const result: Array<string> = []
  for (const breakpoint of Object.keys(config.theme.baseFontSize)) {
    const fontSize = config.theme.baseFontSize[breakpoint]
    if (breakpoint === 'default') {
      result.push(createHtmlFontSizeCss(fontSize))
      continue
    }
    if (typeof config.theme.breakpoint === 'undefined') {
      throw new Error('`theme.breakpoint` not defined in configuration')
    }
    if (typeof config.theme.breakpoint[breakpoint] === 'undefined') {
      throw new Error(
        `Breakpoint not defined in \`theme.breakpoint\`: ${breakpoint}`
      )
    }
    result.push(
      `@media (min-width: ${
        config.theme.breakpoint[breakpoint]
      }) { ${createHtmlFontSizeCss(fontSize)} }`
    )
  }
  return result.join('')
}

function createHtmlFontSizeCss(fontSize: string): string {
  return `html { font-size: ${fontSize}; }`
}

import { Theme, ThemeItem, ThemeKeys } from '../../types'

export function computeColorValueFactory(
  theme: Theme
): (value: string, themeKeys: Array<ThemeKeys>) => null | string {
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
    return null
  }
}

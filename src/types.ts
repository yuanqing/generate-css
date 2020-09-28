export type Config = {
  appendCssFilesPattern: null | string
  outputPath: null | string
  prependCssFilesPattern: null | string
  prettyPrint: boolean
  reset: boolean
  sourceFilesPattern: string
  theme: Theme
}

export type Theme = {
  backgroundColor?: ThemeItem
  baseFontSize?: ThemeItem
  borderColor?: ThemeItem
  borderRadius?: ThemeItem
  borderWidth?: ThemeItem
  breakpoint?: ThemeItem
  color?: ThemeItem
  fontFamily?: ThemeItem
  fontSize?: ThemeItem
  fontWeight?: ThemeItem
  height?: ThemeItem
  letterSpacing?: ThemeItem
  lineHeight?: ThemeItem
  margin?: ThemeItem
  padding?: ThemeItem
  space?: string
  width?: ThemeItem
}

export type ThemeItem = {
  [key: string]: string
}

export type ThemeKeys = Exclude<keyof Theme, 'space'>

export interface ParsedClassName {
  breakpoint: null | string
  pseudoClass: null | PseudoClass
  selector: string
}

export type PseudoClass = {
  isGroup: boolean
  value: string
}

export type CssDeclarationBlocks = {
  breakpoint: null | string
  cssDeclarationBlocks: Array<CssDeclarationBlock>
}
export interface CssDeclarationBlock extends ParsedClassName {
  className: string
  declarations: Declarations
}
export type Declarations = { [property: string]: string }

export type Plugin = {
  regex: RegExp
  createDeclarations: (options: {
    computeColorValue: (
      value: undefined | string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
    computeNumericValue: (
      value: undefined | string,
      themeKeys: Array<ThemeKeys>
    ) => null | string
    matches: RegExpMatchArray
    theme: Theme
  }) => { [property: string]: string }
}

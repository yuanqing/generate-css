export interface CliOptions {
  appendCssFilesPattern: null | string
  configFilePath: string
  minify: boolean
  outputPath: null | string
  prependCssFilesPattern: null | string
  sourceFilesPattern: string
}

export interface Config extends CliOptions {
  reset: boolean
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
  maxHeight?: ThemeItem
  minHeight?: ThemeItem
  maxWidth?: ThemeItem
  minWidth?: ThemeItem
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

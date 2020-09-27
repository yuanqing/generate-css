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
  baseFontSize: ThemeItem
  breakpoint: ThemeItem
  color: ThemeItem
  fontFamily: ThemeItem
  fontSize: ThemeItem
  fontWeight: ThemeItem
  letterSpacing: ThemeItem
  lineHeight: ThemeItem
  space: number | string
}

type ThemeItem = {
  [key: string]: string
}

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
    matches: RegExpMatchArray
    theme: Theme
    formatValue: (value: string) => null | string
  }) => { [property: string]: string }
}
